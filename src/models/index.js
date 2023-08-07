const EmailCode = require("./EmailCode");
const User = require("./User");

User.hasOne(EmailCode) // columna userId en EmailCode
EmailCode.belongsTo(User)