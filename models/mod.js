var db = require("./db");
var bcrypt = require("bcryptjs");

module.exports.verify = function(email, password, done) {
  db.any("SELECT * FROM Person WHERE email=$1", [email])
  .then(function(data) {
    if (!data.length) {
      console.log("Email not found!");
      return done(null, false, { message: "Email not found." });
    } else {
      if (data[0].password_hash == password) {
        console.log("Correct email and password!");
        return done(null, data[0]);
      } else {
        console.log("Incorrect password!");
        return done(null, false, { message: "Incorrect password" });
      }
    }
  }).catch(function(err) {
    console.log("COULD NOT QUERY DB TO VERIFY");
  });
}

module.exports.addUser = function(input, cb) {
  db.one("INSERT INTO Person (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *", [input.name, input.email, input.password])
  .then(function(user) {
    console.log("USER FROM ADD PERSON IN MOD.jS");
    return cb(user);
  }).catch(function(err) {
    return cb(null);
  });
}

module.exports.getUserById = function(id, cb) {
  db.any("SELECT * FROM Person WHERE id=$1", [id])
  .then(function(data) {
    if (data.length) {
      return cb(null, data[0]);
    } else {
      return cb(null, "Error: ID not found.");
    }
  }).catch(function(err) {
    return cb(err);
  });
}

module.exports.addTodo = function(ownerID, input, cb) {
  console.log("INPUT", input);
  db.none("INSERT INTO Todo (owner_id, name, description, collab1_email, collab2_email, collab3_email, completed, timestamp) VALUES ($1, $2, $3, $4, $5, $6, false, now())", [ownerID, input.form_name, input.form_description, input.form_collaborator1, input.form_collaborator2, input.form_collaborator3])
  .then(function(data) {
    return cb(null);
  })
  .catch(function(err) {
    console.log(err);
    return cb(err);
  });
}

module.exports.getTodos = function(ownerID, email, cb) {
  db.any("SELECT * FROM Todo WHERE owner_id=$1 OR collab1_email=$2 OR collab2_email=$2 OR collab3_email=$2 ORDER BY timestamp ASC", [ownerID, email])
  .then(function(todos) {
    console.log(todos);
    todos = todos.map(function(todo) {
      if (todo.owner_id == ownerID) {
        todo.owned = true;
      } else {
        todo.owned = false;
      }
      return todo;
    });
    cb(null, todos);
  })
  .catch(function(err) {
    console.log(err);
    return cb(err);
  });
}

module.exports.deleteTodo = function(id, cb) {
  db.any("DELETE FROM Todo WHERE id=$1", [id])
  .then(function(data) {
    return cb(null);
  }).catch(function(err) {
    console.log(err);
    return cb(err);
  });
}

module.exports.toggleTodo = function(id, currentCompleted, cb) {
  console.log("ID:",id);
  console.log("currentCompleted:", currentCompleted);
  console.log("cb:", cb);
  db.any("UPDATE Todo SET completed=$2 WHERE id=$1", [id, !currentCompleted])
  .then(function(data) {
    return cb(null);
  }).catch(function(err) {
    console.log(err);
    return cb(err);
  });
}
