from django.shortcuts import render

def index(request):
    """Homepage view with project data"""
    
    projects = [
        {
            'title': 'Huckberry E-commerce',
            'description': 'A full-stack e-commerce site with product listings, cart, checkout, and admin dashboard.',
            'tech': ['Django', 'HTML', 'CSS', 'JavaScript', 'PostgreSQL'],
            'github': 'https://github.com/M-IYAAADH/huckberry_project',
            'demo': 'https://huckberry-demo.example.com',
            'featured': True
        },
        {
            'title': 'Fitness & Health Tracker',
            'description': 'CLI-based tracker with roles: Admin, Trainer, Member. Track workouts, nutrition, and progress.',
            'tech': ['Python', 'SQLite', 'CLI'],
            'github': 'https://github.com/iyaadh/fitness-health-tracker',
            'demo': None,
            'featured': False
        },
        {
            'title': 'Work Management System',
            'description': 'Workflow and procurement management system built with Django and PostgreSQL for enterprise use.',
            'tech': ['Django', 'PostgreSQL', 'JavaScript', 'Bootstrap'],
            'github': 'https://github.com/iyaadh/work-management-system',
            'demo': None,
            'featured': True
        }
    ]
    
    skills = {
        'languages': ['Python', 'JavaScript', 'C#', 'SQL', 'HTML/CSS'],
        'frameworks': ['Django', '.NET', 'Flask', 'FastAPI'],
        'tools': ['Git', 'GitHub', 'VS Code', 'Figma', 'PostgreSQL', 'Docker']
    }
    
    context = {
        'projects': projects,
        'skills': skills,
        'name': 'Mohamed Iyaadh Ahmed',
        'email': 'mohamediyaadh144@gmail.com',
        'github': 'https://github.com/M-IYAAADH',
        'linkedin': '#'  # Add your LinkedIn URL
    }
    
    return render(request, 'index.html', context)