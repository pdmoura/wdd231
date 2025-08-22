// scripts/course.js

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true // Example: Mark as completed
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true // Example: Mark as completed
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true // Example: Mark as completed
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.getElementById('course-cards-container');
const totalCreditsSpan = document.getElementById('total-credits');

function displayCourses(courseList) {
    if (!courseContainer || !totalCreditsSpan) return;

    // Clear existing content
    courseContainer.innerHTML = '';

    // Create and append course cards
    courseList.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p>${course.description}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        `;
        courseContainer.appendChild(card);
    });

    // Calculate and display total credits using reduce
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

function setActiveFilter(button) {
    document.querySelectorAll('.course-filters button').forEach(btn => {
        btn.classList.remove('active-filter');
    });
    button.classList.add('active-filter');
}

// Event Listeners for filter buttons
const allBtn = document.getElementById('all-courses');
const cseBtn = document.getElementById('cse-courses');
const wddBtn = document.getElementById('wdd-courses');

if (allBtn && cseBtn && wddBtn) {
    allBtn.addEventListener('click', () => {
        displayCourses(courses);
        setActiveFilter(allBtn);
    });

    cseBtn.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
        setActiveFilter(cseBtn);
    });

    wddBtn.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
        setActiveFilter(wddBtn);
    });
}

// Initial display of all courses on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
    if(allBtn) setActiveFilter(allBtn);
});
