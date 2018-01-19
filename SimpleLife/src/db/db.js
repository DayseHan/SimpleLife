var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.3.136.2',
  user     : 'root',
  password : '',
  database : 'SimpleLife'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  console.log('success');
});

module.exports = {
    select:function(table_name,condition,callback){
        var  sql = callback ? `SELECT * FROM ${table_name}`:`SELECT * FROM ${table_name} where condition`;
        connection.query(sql,function (err, result) {
            console.log(err,result);
            if(err){
                callback({status: false, error: err});
            } else {
                callback({status: true, data: result});
            }  
        });
    },
    insert:function(table_name,key,condition,value_arr,callback){
        // var  addSql = 'INSERT INTO user(id,username,password) VALUES(0,?,?)';
        var  addSql = `INSERT INTO ${table_name}(${key}) VALUES(${condition})`;
        // var  addSqlParams = ['111', '222'];
        var  addSqlParams = value_arr;
        //增
        connection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                    callback({status: false, error: err});
                } else {
                    callback({status: true, data: result});
                }  
        });
    },
    remove:function(table_name,key,value,callback){
        var delSql = `DELETE FROM ${table_name} where ${key}=${value}`;
        //删
        connection.query(delSql,function (err, result) {
            if(err){
                callback({status: false, error: err});
            } else {
                callback({status: true, data: result});
            }    
        });

    },
    update:function(table_name,key,value,condition,callback){
        var modSql = `UPDATE ${table_name} SET ${key} WHERE ${condition} = ?`;
        var modSqlParams = value;
        //改
        connection.query(modSql,modSqlParams,function (err, result) {
           if(err){
                    callback({status: false, error: err});
                } else {
                    callback({status: true, data: result});
            }   
        });
    }


}


//增
// var  addSql = 'INSERT INTO user(id,username,password) VALUES(0,?,?)';
// var  addSqlParams = ['111', '222'];



//删
// var delSql = 'DELETE FROM user where id=123';


//改
// var modSql = 'UPDATE user SET username = ?,password = ? WHERE id = ?';
// var modSqlParams = ['1', '2',123];
// 例子：
// update('user','username=?,password=?',['112456','222456',125],'id',function(res){
//     console.log(res);
// });
 

// 查
// var  sql = 'SELECT ||* FROM user';

 

// connection.end();