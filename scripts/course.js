// Course data
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#',
            '.NET'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Course management class
class CourseManager {
    constructor() {
        // Page elements
        this.coursesContainer = document.getElementById('coursesContainer');
        this.totalCreditsElement = document.getElementById('totalCredits');
        this.filterButtons = document.querySelectorAll('.filter-btn');

        // Modal elements
        this.modal = document.getElementById('courseModal');
        this.modalBody = document.getElementById('modalBody');
        this.modalCloseBtn = this.modal.querySelector('.modal-close');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayCourses(courses);
        this.updateCredits(courses);
    }

    setupEventListeners() {
        // Listener for filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setActiveFilter(e.target);
                this.filterCourses(filter);
            });
        });

        // New listener on the container to open the modal
        this.coursesContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.course-card');
            if (card) {
                // Find the course data using the ID from the card's data attribute
                const courseId = parseInt(card.dataset.courseId);
                const courseData = courses.find(c => c.number === courseId);
                if (courseData) {
                    this.openModal(courseData);
                }
            }
        });

        // Listeners to close the modal
        this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            // Close if the user clicks on the overlay background, but not the content itself
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal(course) {
        // Create the HTML for the technology tags
        const techTags = course.technology.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Populate the modal's body with the course details
        this.modalBody.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <div class="course-info"><strong>Credits:</strong> ${course.credits}</div>
            <div class="course-info"><strong>Certificate:</strong> ${course.certificate}</div>
            <div class="course-description">${course.description}</div>
            <div class="course-tech">${techTags}</div>
        `;
        // Show the modal by adding the 'active' class
        this.modal.classList.add('active');
    }

    closeModal() {
        // Hide the modal by removing the 'active' class
        this.modal.classList.remove('active');
    }

    createCourseCard(course) {
        // The card is now a simple, clickable element
        const card = document.createElement('div');
        card.className = `course-card`;

        // Use a data attribute to uniquely identify the course
        card.dataset.courseId = course.number;

        if (course.completed) {
            card.classList.add('completed');
        }

        // The card only shows the course title to keep it clean
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        card.innerHTML = `
        <h3>${course.subject} ${course.number} <span class="card-icon">+</span></h3>`;
        return card;
    }

    setActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    filterCourses(filter) {
        let filteredCourses;
        if (filter === 'all') {
            filteredCourses = courses;
        } else {
            filteredCourses = courses.filter(course => course.subject === filter);
        }
        this.displayCourses(filteredCourses);
        this.updateCredits(filteredCourses);
    }

    displayCourses(coursesToDisplay) {
        this.coursesContainer.innerHTML = '';
        coursesToDisplay.forEach(course => {
            const courseCard = this.createCourseCard(course);
            this.coursesContainer.appendChild(courseCard);
        });
    }

    updateCredits(coursesToDisplay) {
        const totalCredits = coursesToDisplay.reduce((total, course) => {
            return total + course.credits;
        }, 0);

        if (this.totalCreditsElement) {
            this.totalCreditsElement.textContent = totalCredits;
        }
    }
}

// Initialize the CourseManager class once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CourseManager();
});