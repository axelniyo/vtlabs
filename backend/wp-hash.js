const bcrypt = require("bcrypt");

const password = "F@@ith2026!";

(async () => {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  // Convert to WordPress format
  const wpHash = "$wp$" + hash.replace("$2b$", "$2y$");

  console.log(wpHash);
})();
