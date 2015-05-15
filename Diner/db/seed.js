var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("diner.db");
db.run ("INSERT INTO dishes (name, image_url, price, category_id) VALUES(?, ?, ?, ?)", "hearts", "http://blogs.independent.co.uk/wp-content/uploads/2013/07/IMG_0352.jpg", "67", "1", function(err) {
	if (err) {
		throw err;
	}
});
db.run ("INSERT INTO dishes (name, image_url, price, category_id) VALUES(?, ?, ?, ?)", "livers", "http://blogs.independent.co.uk/wp-content/uploads/2013/07/IMG_0352.jpg", "2354", "3", function(err) {
	if (err) {
		throw err;
	}
});