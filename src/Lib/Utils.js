export const urlifyTitle = (title, id) => {
	const urlifiedTitle = title.toLowerCase()
			 											 .replace(/\ /g, "_")
			 											 .replace(/\W/g, "");
  return id ? urlifiedTitle + "-" + id : urlifiedTitle;
}