import mysql from 'mysql2/promise';
import 'dotenv/config';


const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export class RegisterModel {

  static async pickUpById({
    uuid,
    code
  }) {
    const connection = await mysql.createConnection(config);
    try {
      // Perform the update only if pick_up is not already 1
      const [result] = await connection.query('UPDATE users SET pick_up = 1, updated_at = NOW(), code_relative= ? WHERE uuid = ?', [code, uuid]);
      
      // Check if any row was updated
      if (result.affectedRows === 0) {      
        const [updatedRecords] = await connection.query('SELECT * FROM users WHERE uuid = ?', [uuid]);
        return updatedRecords[0] || null;
      }else{        
        const [updatedRecords] = await connection.query('SELECT * FROM users WHERE uuid = ?', [uuid]);                         
        return updatedRecords[0];    
      }
      
    } catch (error) {
      throw error; // Rethrow the caught error
    } finally {
      await connection.end(); // Close the connection
    }
  }
  
  static async userCatasGeneralVerify({
     cata , date, code
  }) {
    const connection = await mysql.createConnection(config);
    try {
      const [result] = await connection.query('SELECT * FROM users u  LEFT JOIN catas_generales c ON u.id = c.id  AND c.id_cata = ?  AND c.date = ? WHERE u.code_relative = ?', [cata, date, code]);
      return result[0] || null;
    } catch (error) {
      throw error; // Rethrow the caught error
    } finally {
      await connection.end(); // Close the connection
    }
  }

  

  static async create_user ({   
    uuid,
    name,
    email,
    phone,
    catasVip = [],
    catas
  }) {
    const connection = await mysql.createConnection(config)
    try {      
      const [result] = await connection.query(
        'INSERT INTO users (uuid,name,email,phone) VALUES (?,?,?,?)',
        [
          uuid,
          name,
          email,
          phone,         
        ]
      )
      
      if(catasVip.length > 0){
        const values = catasVip.map(cata => [cata.name, cata.fecha, cata.hora, result.insertId]);
        const placeholders = values.map(() => "(?, ?, ?, ?)").join(", ");
        const flatValues = values.flat();
        await connection.query(
          `INSERT INTO catas_vip (name, date, hora, user_id) VALUES ${placeholders}`,
          flatValues
        );
      }      

      if(catas.length > 0){
        const values = catas.map(cata => [cata.id, cata.name, cata.date, cata.hora, cata.sala, result.insertId]);
        const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
        const flatValues = values.flat();
        await connection.query(
          `INSERT INTO catas_generales (id_cata, name, date, hora, sala, user_id) VALUES ${placeholders}`,
          flatValues
        );
      }

      return {
        status: true,
        insertId: result.insertId,
        ...result,
      }
    }catch (error) {
      console.log(error)
      return {
        status: false,
      }
    }
    finally {
      await connection.end() // Close the connection
    }
  }

  static async add_companions(companions) {
    const connection = await mysql.createConnection(config);
    try {
      
      const values = companions.map(({ uuid, name, email }) => [uuid, name, email]);     
      const placeholders = values.map(() => '(?, ?, ?)').join(',');        
      const flattenedValues = values.flat(); 

      const [result] = await connection.query(
        `INSERT INTO users (uuid, name, email) VALUES ${placeholders}`,
        flattenedValues
      );

      
      const lastInsertId = result.insertId;      
      const affectedRows = result.affectedRows;      
      const insertedIds = Array.from({ length: affectedRows }, (_, index) => lastInsertId + index);
      
      
      const vipValues = [];
      const generalesValues = [];

      companions.forEach((companion, index) => {
        if (companion.catasVip.length > 0) {
          companion.catasVip.forEach(cata => {
            vipValues.push([cata.name, cata.fecha, cata.hora, insertedIds[index]]);
          });
        }

        if (companion.catas.length > 0) {
          companion.catas.forEach(cata => {
            generalesValues.push([cata.id,cata.name, cata.date, cata.hora, cata.sala, insertedIds[index]]);
          });
        }
      });

      // Bulk insert for catasVip
      if (vipValues.length > 0) {
        const vipPlaceholders = vipValues.map(() => "(?, ?, ?, ?)").join(", ");
        const vipFlatValues = vipValues.flat();
        await connection.query(
          `INSERT INTO catas_vip (name, date, hora, user_id) VALUES ${vipPlaceholders}`,
          vipFlatValues
        );
      }

      // Bulk insert for catas_generales
      if (generalesValues.length > 0) {
        const generalesPlaceholders = generalesValues.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
        const generalesFlatValues = generalesValues.flat();
        await connection.query(
          `INSERT INTO catas_generales (id_cata,name, date, hora, sala, user_id) VALUES ${generalesPlaceholders}`,
          generalesFlatValues
        );
      }

      return {
        status: true,       
      }
    }
    catch (error) {
      console.log(error)
      return {
        status: false,
      }
    }
    finally {
      await connection.end(); // Close the connection
    }
  }  

  static async save_order (paypal_id_order,paypal_id_transaction,user_id, items, total) {
    const connection = await mysql.createConnection(config)
    try {      
      const [registers] = await connection.query(
        'INSERT INTO orders (paypal_id_order, paypal_id_transaction, user_id, items, total) VALUES (?,?,?,?,?)',
        [
          paypal_id_order,
          paypal_id_transaction,
          user_id,   
          JSON.stringify(items),
          total
        ]
      )
      return registers
    } finally {
      await connection.end() // Close the connection
    }
  }

  static async checkCoupon ({
    couponCode
  }) {
    const connection = await mysql.createConnection(config)
    try {
      const [result] = await connection.query('SELECT * FROM coupons WHERE code = ? AND user_id = 0', [couponCode] )           
      return result;
    } finally {
      await connection.end() // Close the connection
    }
  }

  static async useCoupon(couponCodes, user_id) {
    const connection = await mysql.createConnection(config);
    try {
      // Generate placeholders for each coupon code
      const placeholders = couponCodes.map(() => '?').join(',');
      // Adjust the query to use a placeholder for the user_id as well
      const query = `UPDATE coupons SET user_id = ? WHERE code IN (${placeholders})`;
      // The first parameter is now user_id, followed by ...couponCodes spread into individual parameters
      await connection.query(query, [user_id, ...couponCodes]);
      return {
        status: true,       
      }
    } catch (error) {
      return {
        status: false,       
      }
    } finally {
      await connection.end(); // Close the connection
    }
  }

  static async verifyVipTicket ({
    cataVip,
    date,
  }) {
    console.log(cataVip, date)
    const connection = await mysql.createConnection(config)
    try {
      const [result] = await connection.query('SELECT  COUNT(*) AS total FROM catas_vip WHERE name = ? AND date = ?', [cataVip, date] )
      console.log(result)  
      return result[0].total < 30 ? true : false;
    } finally {
      await connection.end() // Close the connection
    }
  }

  static async verifyGeneralTicket ({
    cataGeneral,
    date,
  }) {
    console.log(cataGeneral, date)
    const connection = await mysql.createConnection(config)
    try {
      const [result] = await connection.query('SELECT  COUNT(*) AS total FROM catas_generales WHERE id_cata = ? AND date = ?', [cataGeneral, date] )
      console.log(result)  
      return result[0].total < 25 ? true : false;
    } finally {
      await connection.end() // Close the connection
    }
  }

  static async getCatasGeneral () {
    const connection = await mysql.createConnection(config)
    try {
      const [result] = await connection.query('SELECT * FROM catas_generales')
      return result
    } finally {
      await connection.end() // Close the connection
    }
  }
  
  static async getCatasVip () {
    const connection = await mysql.createConnection(config)
    try {
      const [result] = await connection.query('SELECT * FROM catas_vip')
      return result
    } finally {
      await connection.end() // Close the connection
    }
  }
}



