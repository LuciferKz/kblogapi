const crypto = require('crypto');

//加密迭代次数
let iterations = 3000;

// hash长度
let keylen = 128;

/*
 *
 *  ref: https://cnodejs.org/topic/5043b97ffef591855138b4e0
 *
 *  crypto.randomBytes(string, [,callback])
 *
 *  生成加密用的伪随机码，支持2种方法，当传递cb的话就是异步方法，不传cb就是同步方法
 *
 *  crypto.pbkdf2(password, salt, iterations, keylen, callback)
 *
 *  异步的方法，通过伪随机码来加密迭代数次，利用sha1算法生成一个更加强壮的加密串。我们结合上面的 crypto.randomBytes 来生成一个强壮的加密串。
 *
 */

module.exports = {
  generate: function (pass, cb) {
    crypto.randomBytes(64, function (err, salt) {
      if(err) return cb(err);
      salt = new Buffer(salt).toString('hex');
      crypto.pbkdf2(pass, salt, iterations, keylen, 'sha512', function (err, hash) {
        if(err) return cb(err);
        hash = new Buffer(hash).toString('hex');
        return cb(null, salt, hash);
      })
    })
  },
  verify: function (pass, salt, cb) {
    crypto.pbkdf2(pass, salt, iterations, keylen, 'sha512', function (err, hash) {
      if(err) return cb(err);
      hash = new Buffer(hash).toString('hex');
      return cb(null, hash);
    })
  }
}