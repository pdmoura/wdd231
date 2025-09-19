//set parameter "sections" for when you call the forEach function
export function populateSections(sections) {
  const sectionSelect = document.querySelector("#sectionNumber");
  //remove byuiCourse from sections.forEach in orginal code since that function has been moved
  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `${section.sectionNumber}`;
    sectionSelect.appendChild(option);
  });
}

