module.exports = mongoose => {
	const Schema = mongoose.Schema;

	var roleSchema = new Schema(
		{	
			name: String,
			privileges: [ String ]
		}
	);
	
	var Role = mongoose.model('Role', roleSchema );

	return Role;
}

