// Simple sidebar navigation
document.addEventListener('DOMContentLoaded', () => {
    const sidebarMenu = document.getElementById('sidebar-menu');
    const pageTitle = document.getElementById('page-title');
    const backBtn = document.getElementById('back-btn');
    const homePage = document.getElementById('home-page');
    const subjectContent = document.getElementById('subject-content');
    const subjectsContainer = document.getElementById('subjects-container');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    // Sidebar toggle functionality
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Back button functionality
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showHome();
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterSubjects(e.target.value);
        });
    }

    // Menu item click handlers
    if (sidebarMenu) {
        sidebarMenu.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            if (menuItem) {
                const subject = menuItem.getAttribute('data-subject');
                
                // Update active menu item
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                menuItem.classList.add('active');
                
                if (subject === 'home') {
                    showHome();
                } else {
                    loadSubject(subject);
                }
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    function showHome() {
        homePage.classList.add('active');
        subjectContent.classList.remove('active');
        pageTitle.textContent = 'Welcome to CodingWithArqam';
        backBtn.style.display = 'none';
    }

    function loadSubject(subjectName) {
        homePage.classList.remove('active');
        subjectContent.classList.add('active');
        pageTitle.textContent = getSubjectDisplayName(subjectName);
        backBtn.style.display = 'block';
        
        // Load JSON content
        loadSubjectContent(subjectName);
    }

    function getSubjectDisplayName(subjectName) {
        const displayNames = {
            'ajax': 'AJAX',
            'android': 'Android',
            'angular': 'Angular',
            'awsamplify': 'AWS Amplify',
            'bootstrap': 'Bootstrap',
            'cloudcomputing': 'Cloud Computing',
            'css': 'CSS',
            'database': 'Database',
            'datastructures': 'Data Structures',
            'docker': 'Docker',
            'git': 'Git',
            'hardware': 'Hardware',
            'html': 'HTML',
            'javascript': 'JavaScript',
            'jira': 'Jira',
            'jobplatforms': 'Job Platforms',
            'linux': 'Linux',
            'networking': 'Networking',
            'nodejs': 'NodeJS',
            'oop': 'Object Oriented Programming',
            'problemsolving': 'Problem Solving',
            'projectmanagement': 'Project Management',
            'qualityassurance': 'Quality Assurance',
            'reactjs': 'ReactJS',
            'salespresales': 'Sales & Pre-Sales',
            'selenium': 'Selenium',
            'softskills': 'Soft Skills',
            'softwarehouses': 'Software Houses',
            'systemdesign': 'System Design',
            'vscode': 'VS Code',
            'webdevelopment': 'Web Development'
        };
        return displayNames[subjectName] || subjectName;
    }

    async function loadSubjectContent(subjectName) {
        const subjectDisplayName = getSubjectDisplayName(subjectName);
        
        // Try to load actual JSON content from files
        try {
            const response = await fetch(`web_notes/${getSubjectFileName(subjectName)}.json`);
            if (response.ok) {
                const data = await response.json();
                renderSubjectContent(data);
                return;
            }
        } catch (error) {
            console.log(`Could not load JSON for ${subjectName}:`, error);
        }
        
        // Fallback to template content
        const content = getSubjectContent(subjectName, subjectDisplayName);
        subjectsContainer.innerHTML = content;
        addTopicClickHandlers();
    }


    function renderSubjectContent(subjectData) {
        subjectsContainer.innerHTML = '';
        
        if (!subjectData.topics || subjectData.topics.length === 0) {
            subjectsContainer.innerHTML = '<p>No topics available for this subject.</p>';
            return;
        }

        subjectData.topics.forEach(topic => {
            const topicElement = createTopicElement(topic);
            subjectsContainer.appendChild(topicElement);
        });
    }

    function createTopicElement(topic) {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';

        const topicTitle = document.createElement('div');
        topicTitle.className = 'topic-title';
        topicTitle.innerHTML = `${topic.title} <span class="expand-icon"></span>`;
        topicDiv.appendChild(topicTitle);

        const topicDetails = document.createElement('div');
        topicDetails.className = 'topic-details';

        if (topic.description) {
            const description = document.createElement('div');
            description.className = 'topic-description';
            description.textContent = topic.description;
            topicDetails.appendChild(description);
        }

        if (topic.points && topic.points.length > 0) {
            const pointsList = document.createElement('ul');
            pointsList.className = 'topic-points';
            topic.points.forEach(point => {
                const listItem = document.createElement('li');
                listItem.textContent = point;
                pointsList.appendChild(listItem);
            });
            topicDetails.appendChild(pointsList);
        }

        if (topic.children && topic.children.length > 0) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'children-content';
            topic.children.forEach(child => {
                childrenContainer.appendChild(createTopicElement(child));
            });
            topicDetails.appendChild(childrenContainer);
        }

        topicDiv.appendChild(topicDetails);

        // Add click event for expand/collapse
        topicTitle.addEventListener('click', () => {
            const isActive = topicDetails.classList.contains('active');
            topicDetails.classList.toggle('active');
            
            const icon = topicTitle.querySelector('.expand-icon');
            if (icon) {
                icon.classList.toggle('collapse-icon');
            }
        });

        return topicDiv;
    }

    function getSubjectContent(subjectName, displayName) {
        const contentTemplates = {
            'css': `
                <div class="subject-card">
                    <div class="subject-title">
                        <h1>${displayName}</h1>
                    </div>
                    <div class="subject-content active">
                        <div class="topic">
                            <div class="topic-title">
                                Introduction to CSS <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details active">
                                <div class="topic-description">
                                    CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML.
                                </div>
                                <ul class="topic-points">
                                    <li>Separates content from presentation</li>
                                    <li>Controls layout, colors, fonts, and spacing</li>
                                    <li>Makes websites responsive and interactive</li>
                                    <li>Essential for modern web development</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="topic">
                            <div class="topic-title">
                                CSS Selectors <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details">
                                <div class="topic-description">
                                    Selectors are patterns used to select and style HTML elements.
                                </div>
                                <ul class="topic-points">
                                    <li>Element selectors: p, h1, div</li>
                                    <li>Class selectors: .class-name</li>
                                    <li>ID selectors: #element-id</li>
                                    <li>Attribute selectors: [type="text"]</li>
                                    <li>Pseudo-classes: :hover, :focus, :nth-child()</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="topic">
                            <div class="topic-title">
                                CSS Properties <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details">
                                <div class="topic-description">
                                    Key CSS properties for styling elements.
                                </div>
                                <ul class="topic-points">
                                    <li>color: text color</li>
                                    <li>background-color: background color</li>
                                    <li>font-size: text size</li>
                                    <li>margin: outer spacing</li>
                                    <li>padding: inner spacing</li>
                                    <li>border: element borders</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="topic">
                            <div class="topic-title">
                                Layout Techniques <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details">
                                <div class="topic-description">
                                    Modern CSS layout methods for responsive design.
                                </div>
                                <ul class="topic-points">
                                    <li>Flexbox: one-dimensional layouts</li>
                                    <li>CSS Grid: two-dimensional layouts</li>
                                    <li>Float: traditional layout method</li>
                                    <li>Position: absolute, relative, fixed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'javascript': `
                <div class="subject-card">
                    <div class="subject-title">
                        <h1>${displayName}</h1>
                    </div>
                    <div class="subject-content active">
                        <div class="topic">
                            <div class="topic-title">
                                JavaScript Fundamentals <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details active">
                                <div class="topic-description">
                                    JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web.
                                </div>
                                <ul class="topic-points">
                                    <li>Dynamic, weakly typed programming language</li>
                                    <li>Supports object-oriented, imperative, and functional programming</li>
                                    <li>Runs in browsers and on servers (Node.js)</li>
                                    <li>Essential for interactive web applications</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="topic">
                            <div class="topic-title">
                                Variables and Data Types <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details">
                                <div class="topic-description">
                                    Understanding how to store and work with different types of data in JavaScript.
                                </div>
                                <ul class="topic-points">
                                    <li>var, let, const for variable declaration</li>
                                    <li>Primitive types: string, number, boolean, undefined, null</li>
                                    <li>Reference types: object, array, function</li>
                                    <li>Type coercion and comparison</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="topic">
                            <div class="topic-title">
                                Functions <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details">
                                <div class="topic-description">
                                    Functions are reusable blocks of code that perform specific tasks.
                                </div>
                                <ul class="topic-points">
                                    <li>Function declarations vs expressions</li>
                                    <li>Arrow functions (ES6)</li>
                                    <li>Parameters and arguments</li>
                                    <li>Return statements and scope</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'reactjs': `
                <div class="subject-card">
                    <div class="subject-title">
                        <h1>${displayName}</h1>
                    </div>
                    <div class="subject-content active">
                        <div class="topic">
                            <div class="topic-title">
                                React Introduction <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details active">
                                <div class="topic-description">
                                    React is a JavaScript library for building user interfaces, particularly web applications.
                                </div>
                                <ul class="topic-points">
                                    <li>Component-based architecture</li>
                                    <li>Virtual DOM for performance</li>
                                    <li>Declarative programming paradigm</li>
                                    <li>Developed by Facebook</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="topic">
                            <div class="topic-title">
                                Components <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details">
                                <div class="topic-description">
                                    React applications are built using components - reusable pieces of UI.
                                </div>
                                <ul class="topic-points">
                                    <li>Functional components</li>
                                    <li>Class components</li>
                                    <li>Props for data passing</li>
                                    <li>State management</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="topic">
                            <div class="topic-title">
                                JSX <span class="expand-icon"></span>
                            </div>
                            <div class="topic-details">
                                <div class="topic-description">
                                    JSX is a syntax extension that allows you to write HTML-like code in JavaScript.
                                </div>
                                <ul class="topic-points">
                                    <li>HTML-like syntax in JavaScript</li>
                                    <li>Must have single parent element</li>
                                    <li>Use className instead of class</li>
                                    <li>JavaScript expressions in curly braces</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        
        return contentTemplates[subjectName] || `
            <div class="subject-card">
                <div class="subject-title">
                    <h1>${displayName}</h1>
                </div>
                <div class="subject-content active">
                    <div class="topic">
                        <div class="topic-title">
                            Introduction <span class="expand-icon"></span>
                        </div>
                        <div class="topic-details active">
                            <div class="topic-description">
                                Welcome to ${displayName} notes and resources.
                            </div>
                            <ul class="topic-points">
                                <li>Comprehensive ${displayName} concepts</li>
                                <li>Best practices and examples</li>
                                <li>Practical implementation guides</li>
                                <li>Common patterns and techniques</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="topic">
                        <div class="topic-title">
                            Key Concepts <span class="expand-icon"></span>
                        </div>
                        <div class="topic-details">
                            <div class="topic-description">
                                Essential concepts you need to master in ${displayName}.
                            </div>
                            <ul class="topic-points">
                                <li>Fundamental principles</li>
                                <li>Core functionality</li>
                                <li>Advanced features</li>
                                <li>Integration patterns</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function addTopicClickHandlers() {
        const topicTitles = subjectsContainer.querySelectorAll('.topic-title');
        topicTitles.forEach(title => {
            title.addEventListener('click', () => {
                const details = title.nextElementSibling;
                const isActive = details.classList.contains('active');
                details.classList.toggle('active');
                
                const icon = title.querySelector('.expand-icon');
                if (icon) {
                    icon.classList.toggle('collapse-icon');
                }
            });
        });
    }

    function getSubjectFileName(subjectName) {
        const fileNames = {
            'ajax': 'AJAX',
            'android': 'Android',
            'angular': 'Angular',
            'awsamplify': 'AWSAmplify',
            'bootstrap': 'Bootstrap',
            'cloudcomputing': 'CloudComputing',
            'css': 'CSS',
            'database': 'Database',
            'datastructures': 'DataStructures',
            'docker': 'Docker',
            'git': 'Git',
            'hardware': 'Hardware',
            'html': 'HTML',
            'javascript': 'JavaScript',
            'jira': 'Jira',
            'jobplatforms': 'JobPlatforms',
            'linux': 'Linux',
            'networking': 'Networking',
            'nodejs': 'NodeJS',
            'oop': 'ObjectOrientedProgramming',
            'problemsolving': 'ProblemSolving',
            'projectmanagement': 'ProjectManagement',
            'qualityassurance': 'QualityAssurance',
            'reactjs': 'ReactJS',
            'salespresales': 'SalesPreSales',
            'selenium': 'Selenium',
            'softskills': 'SoftSkills',
            'softwarehouses': 'SoftwareHouses',
            'systemdesign': 'SystemDesign',
            'vscode': 'VSCode',
            'webdevelopment': 'WebDevelopment'
        };
        return fileNames[subjectName] || subjectName;
    }

    function renderSubjectContent(subjectData) {
        subjectsContainer.innerHTML = '';
        
        if (!subjectData.topics || subjectData.topics.length === 0) {
            subjectsContainer.innerHTML = '<p>No topics available for this subject.</p>';
            return;
        }

        subjectData.topics.forEach(topic => {
            const topicElement = createTopicElement(topic);
            subjectsContainer.appendChild(topicElement);
        });
    }

    function createTopicElement(topic) {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';

        const topicTitle = document.createElement('div');
        topicTitle.className = 'topic-title';
        topicTitle.innerHTML = `${topic.title} <span class="expand-icon"></span>`;
        topicDiv.appendChild(topicTitle);

        const topicDetails = document.createElement('div');
        topicDetails.className = 'topic-details';

        if (topic.description) {
            const description = document.createElement('div');
            description.className = 'topic-description';
            description.textContent = topic.description;
            topicDetails.appendChild(description);
        }

        if (topic.points && topic.points.length > 0) {
            const pointsList = document.createElement('ul');
            pointsList.className = 'topic-points';
            topic.points.forEach(point => {
                const listItem = document.createElement('li');
                listItem.textContent = point;
                pointsList.appendChild(listItem);
            });
            topicDetails.appendChild(pointsList);
        }

        if (topic.children && topic.children.length > 0) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'children-content';
            topic.children.forEach(child => {
                childrenContainer.appendChild(createTopicElement(child));
            });
            topicDetails.appendChild(childrenContainer);
        }

        topicDiv.appendChild(topicDetails);

        // Add click event for expand/collapse
        topicTitle.addEventListener('click', () => {
            const isActive = topicDetails.classList.contains('active');
            topicDetails.classList.toggle('active');
            
            const icon = topicTitle.querySelector('.expand-icon');
            if (icon) {
                icon.classList.toggle('collapse-icon');
            }
        });

        return topicDiv;
    }

    function filterSubjects(searchTerm) {
        const menuItems = document.querySelectorAll('.menu-item');
        const searchLower = searchTerm.toLowerCase();
        
        menuItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchLower) || searchTerm === '') {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });
});