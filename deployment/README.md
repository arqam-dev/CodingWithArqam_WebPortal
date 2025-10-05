# CodingWithArqam Web Portal

A comprehensive programming notes portal built for GitHub Pages deployment.

## Features

- 📚 **31 Programming Subjects**: Complete coverage of programming topics
- 🔍 **Advanced Search**: Search across all topics and concepts
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Beautiful, collapsible FAQ-style interface
- ⚡ **Fast Loading**: Optimized for GitHub Pages

## Subjects Covered

- **Frontend**: Angular, ReactJS, JavaScript, HTML, CSS, Bootstrap
- **Backend**: NodeJS, WebDevelopment, Database, SystemDesign
- **Tools**: Git, VSCode, Docker, Linux, Jira
- **Cloud**: CloudComputing, AWSAmplify, Networking
- **Mobile**: Android, AJAX
- **Career**: SoftSkills, JobPlatforms, SalesPreSales, SoftwareHouses
- **Testing**: QualityAssurance, Selenium
- **Management**: ProjectManagement, ProblemSolving
- **Architecture**: DataStructures, ObjectOrientedProgramming, Hardware

## Deployment on GitHub Pages

### Method 1: Direct Deployment (Recommended)

1. **Create a new repository** on GitHub named `your-username.github.io`
2. **Upload all files** from this `deployment` folder to the root of your repository
3. **Enable GitHub Pages** in repository settings
4. **Your site will be live** at `https://your-username.github.io`

### Method 2: Project Pages

1. **Create a repository** named `CodingWithArqam-Portal`
2. **Upload all files** from this `deployment` folder to the repository
3. **Enable GitHub Pages** in repository settings
4. **Your site will be live** at `https://your-username.github.io/CodingWithArqam-Portal`

## File Structure

```
deployment/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling and responsive design
├── js/
│   └── app.js          # JavaScript functionality
├── web_notes/          # JSON data files (linked from parent directory)
└── README.md           # This file
```

## How It Works

1. **JSON Data**: Reads from JSON files in the parent `web_notes` directory
2. **Dynamic Loading**: Loads subjects and topics dynamically
3. **Search Functionality**: Real-time search across all content
4. **Collapsible Interface**: FAQ-style expandable topics
5. **Responsive Design**: Works on desktop, tablet, and mobile

## Customization

- **Add New Subjects**: Add new JSON files to the `web_notes` directory
- **Modify Styling**: Edit `css/style.css` for custom appearance
- **Update Content**: Modify JSON files to update content
- **Add Features**: Extend `js/app.js` for additional functionality

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- **Fast Loading**: Optimized for GitHub Pages
- **No Database**: Uses static JSON files
- **CDN Ready**: Can be enhanced with CDN
- **SEO Friendly**: Proper meta tags and structure

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.
