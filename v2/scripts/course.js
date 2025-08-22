// Course management and filtering functionality
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

class CourseManager {
    constructor() {
        this.coursesContainer = document.getElementById('coursesContainer');
        this.totalCreditsElement = document.getElementById('totalCredits');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.displayCourses(courses);
        this.updateCredits(courses);
    }
    
    setupEventListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setActiveFilter(e.target);
                this.filterCourses(filter);
            });
        });
    }
    
    setActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
    
    filterCourses(filter) {
        this.currentFilter = filter;
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
    
    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        
        const techTags = course.technology.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <div class="course-info">Credits: ${course.credits}</div>
            <div class="course-info">Certificate: ${course.certificate}</div>
            <div class="course-description">${course.description}</div>
            <div class="course-tech">${techTags}</div>
        `;
        
        return card;
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

// Initialize course manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CourseManager();
});