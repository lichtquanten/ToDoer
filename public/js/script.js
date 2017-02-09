var url = "http://127.0.0.1:8000";

$(document).ready(function() {
    $("#switch_to_register").click(function() {
        $("#login").fadeOut('fast', function() {
            $("#register").fadeIn('fast');
        });
    });

    $("#switch_to_login").click(function() {
        $("#register").fadeOut('fast', function() {
            $("#login").fadeIn('fast');
        });
    });

    $("#login_form").submit(function(e) {
        e.preventDefault();
        var ready = true;
        var data = {
            email: testEmail(sanitizeString($("#login_email").val())),
            password: sanitizeString($("#login_password").val())
        };
        for (var i = 0; i < Object.keys(data).length; i++) {
          var key = Object.keys(data)[i];
          if (!data[key]) {
            $("#login_"+key).addClass("error");
            ready = false;
          } else {
            $("#login_"+key).removeClass("error");
          }
        }
        if (ready) {
            $.post("http://localhost:8000/login", data, function(res) {
                console.log(res);
            });
        }
        return false;
    });
    $("#register_form").submit(function(e) {
        e.preventDefault();
        var ready = true;
        var data = {
            fname: sanitizeString($("#register_fname").val()),
            lname: sanitizeString($("#register_lname").val()),
            email: testEmail(sanitizeString($("#register_email").val())),
            password: sanitizeString($("#register_password").val()),
            confirm_password: sanitizeString($("#register_confirm_password").val())
        };
        for (var i = 0; i < Object.keys(data).length; i++) {
          var key = Object.keys(data)[i];
          if (!data[key]) {
            $("#register_"+key).addClass("error");
            ready = false;
          } else {
            $("#register_"+key).removeClass("error");
          }
        }
        if (data.password != data.confirm_password) {
          $("#register_confirm_password").addClass("error");
          ready = false;
        }
        if (ready) {
            $.post("http://localhost:8000/register", data, function(res) {
                console.log(res);
            });
        }
        return false;
    });
});

function sanitizeString(str) {
    if (!str) {
      return false;
    }
    var newStr = str.replace(/[^a-z0-9@ \.,_-]/gim, "");
    if (newStr != str || (newStr = newStr.trim()).length == 0 || newStr.length > 50) {
        return false;
    }
    return newStr;
}

function testEmail(email) {
    if (!email) {
        return false;
    } else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
        return email;
    }
    return false;
}
