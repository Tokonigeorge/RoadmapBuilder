from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from dotenv import load_dotenv
import os

load_dotenv()
MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")
MONGODB_CLUSTER = os.getenv("MONGODB_CLUSTER", "metadata.oj7wh.mongodb.net")
MONGO_URI = f"mongodb+srv://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=metadata&tls=true"
DB_NAME = "roadmap_db"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
topics_collection = db["topics"]


topics_data = [
    {"name": "Python", "description": "Learn Python programming from basics to advanced"},
    {"name": "JavaScript", "description": "Master JavaScript and frontend development"},
    {"name": "React", "description": "Build dynamic web apps with React"},
    {"name": "Machine Learning", "description": "Introduction to ML algorithms and models"},
    {"name": "Data Science", "description": "Analyze and visualize data using Python/R"},
    {"name": "Cybersecurity", "description": "Ethical hacking and security fundamentals"},
    {"name": "AWS Cloud", "description": "Cloud computing with Amazon Web Services"},
    {"name": "Blockchain", "description": "Blockchain technology and smart contracts"},
    {"name": "Django", "description": "Build scalable web apps with Django"},
    {"name": "FastAPI", "description": "Create high-performance APIs with FastAPI"},
    {"name": "Flutter", "description": "Cross-platform mobile apps with Flutter"},
    {"name": "Node.js", "description": "Backend development using Node.js"},
    {"name": "SQL", "description": "Database management with SQL"},
    {"name": "NoSQL", "description": "MongoDB, Cassandra, and NoSQL databases"},
    {"name": "Kubernetes", "description": "Container orchestration with Kubernetes"},
    {"name": "Docker", "description": "Containerize applications using Docker"},
    {"name": "DevOps", "description": "CI/CD pipelines and infrastructure automation"},
    {"name": "GraphQL", "description": "Efficient API querying with GraphQL"},
    {"name": "Rust", "description": "Systems programming with Rust"},
    {"name": "C++", "description": "High-performance applications in C++"},
    {"name": "Golang", "description": "Build efficient systems with Go"},
    {"name": "Prompt Engineering", "description": "Optimize AI model prompts"},
    {"name": "LLMs", "description": "Large Language Models like GPT-4 and Llama"},
    {"name": "TensorFlow", "description": "Deep learning with TensorFlow"},
    {"name": "PyTorch", "description": "Neural networks using PyTorch"},
    {"name": "HTML/CSS", "description": "Frontend web development basics"},
    {"name": "UX/UI Design", "description": "User experience and interface design"},
    {"name": "Figma", "description": "Design and prototype with Figma"},
    {"name": "Swift", "description": "iOS app development with Swift"},
    {"name": "Java", "description": "Object-oriented programming with Java"},
    {"name": "Spring Boot", "description": "Enterprise apps with Spring Boot"},
    {"name": "Game Development", "description": "Build games using Unity/Unreal Engine"},
    {"name": "Ethical Hacking", "description": "Penetration testing and security audits"},
    {"name": "Networking", "description": "Computer networks and protocols (TCP/IP)"},
    {"name": "Big Data", "description": "Hadoop, Spark, and data pipelines"},
    {"name": "AI Agents", "description": "Autonomous AI agents and workflows"},
    {"name": "Algorithmic Trading", "description": "Quantitative finance strategies"},
    {"name": "Marketing Analytics", "description": "Data-driven marketing insights"},
    {"name": "SEO", "description": "Search Engine Optimization techniques"},
    {"name": "Copywriting", "description": "Persuasive writing for conversions"},
    {"name": "Product Management", "description": "Manage product lifecycles"},
    {"name": "Agile/Scrum", "description": "Agile project management frameworks"},
    {"name": "3D Modeling", "description": "Blender/Maya for 3D design"},
    {"name": "Cyber Threat Intel", "description": "Analyze and mitigate cyber risks"},
    {"name": "Bioinformatics", "description": "Computational biology tools"},
    {"name": "Embedded Systems", "description": "Program IoT devices and hardware"},
    {"name": "AR/VR", "description": "Augmented and Virtual Reality development"},
    {"name": "Psychology", "description": "Human behavior and cognition"},
    {"name": "Philosophy", "description": "Critical thinking and ethics"},
    # Added 50+ more topics below
    {"name": "WebAssembly", "description": "High-performance web apps with WASM"},
    {"name": "Svelte", "description": "Build reactive UIs with Svelte"},
    {"name": "Vue.js", "description": "Frontend development with Vue.js"},
    {"name": "TypeScript", "description": "Strongly-typed JavaScript"},
    {"name": "Jenkins", "description": "CI/CD pipelines with Jenkins"},
    {"name": "Ansible", "description": "IT automation and configuration management"},
    {"name": "Terraform", "description": "Infrastructure as Code (IaC)"},
    {"name": "Elasticsearch", "description": "Search and analytics engine"},
    {"name": "Kafka", "description": "Real-time data streaming platforms"},
    {"name": "Microservices", "description": "Design scalable distributed systems"},
    {"name": "Serverless", "description": "Build apps with AWS Lambda/Azure Functions"},
    {"name": "Quantum Computing", "description": "Basics of quantum algorithms"},
    {"name": "Web3", "description": "Decentralized applications (dApps)"},
    {"name": "Solidity", "description": "Smart contract development for Ethereum"},
    {"name": "Computer Vision", "description": "Image recognition with OpenCV"},
    {"name": "Robotics", "description": "Program autonomous robots"},
    {"name": "Digital Marketing", "description": "Online advertising and SEO"},
    {"name": "Cryptography", "description": "Encryption and data security"},
    {"name": "Linux Administration", "description": "Manage Linux servers"},
    {"name": "Windows PowerShell", "description": "Automate tasks in Windows"},
    {"name": "Jira", "description": "Project tracking and agile workflows"},
    {"name": "Git", "description": "Version control and collaboration"},
    {"name": "REST APIs", "description": "Design and consume RESTful APIs"},
    {"name": "Web Scraping", "description": "Extract data from websites"},
    {"name": "Chatbots", "description": "Build AI-driven chatbots"},
    {"name": "NLP", "description": "Natural Language Processing techniques"},
    {"name": "Reinforcement Learning", "description": "Train AI with reward systems"},
    {"name": "GANs", "description": "Generative Adversarial Networks"},
    {"name": "Data Engineering", "description": "Design data pipelines"},
    {"name": "Tableau", "description": "Data visualization and dashboards"},
    {"name": "Power BI", "description": "Business analytics with Microsoft Power BI"},
    {"name": "Excel VBA", "description": "Automate Excel tasks with VBA"},
    {"name": "MATLAB", "description": "Numerical computing and simulations"},
    {"name": "R Programming", "description": "Statistical analysis with R"},
    {"name": "Unity", "description": "Game development with Unity Engine"},
    {"name": "Unreal Engine", "description": "AAA game development tools"},
    {"name": "AutoCAD", "description": "2D/3D CAD design"},
    {"name": "Photoshop", "description": "Photo editing and graphic design"},
    {"name": "Premiere Pro", "description": "Professional video editing"},
    {"name": "Final Cut Pro", "description": "Video production for macOS"},
    {"name": "Logic Pro", "description": "Music production and audio editing"},
    {"name": "Podcasting", "description": "Create and market podcasts"},
    {"name": "Digital Art", "description": "Procreate/Photoshop for artists"},
    {"name": "Animation", "description": "2D/3D animation techniques"},
    {"name": "Creative Writing", "description": "Fiction and non-fiction writing"},
    {"name": "Public Speaking", "description": "Master presentations and speeches"},
    {"name": "Leadership", "description": "Team management and strategy"},
    {"name": "Negotiation", "description": "Win-win negotiation tactics"},
    {"name": "Entrepreneurship", "description": "Start and scale businesses"},
    {"name": "Stock Trading", "description": "Technical analysis and strategies"},
    {"name": "Real Estate Investing", "description": "Property investment basics"},
    {"name": "Personal Finance", "description": "Budgeting and wealth management"},
    {"name": "Climate Science", "description": "Climate change and sustainability"},
    {"name": "Astrophysics", "description": "Study stars, planets, and galaxies"},
    {"name": "Neuroscience", "description": "Brain function and cognition"},
    {"name": "Biotechnology", "description": "Genetic engineering and CRISPR"},
    {"name": "Forensic Science", "description": "Crime scene investigation"},
    {"name": "Geopolitics", "description": "Global political dynamics"},
    {"name": "History of Tech", "description": "Evolution of computing and innovation"},
    {"name": "Ethics in AI", "description": "Responsible AI development"},
    {"name": "Quantum Physics", "description": "Fundamentals of quantum mechanics"},
    {"name": "Astrobiology", "description": "Life in the universe"},
    {"name": "Graphic Design", "description": "Visual communication principles"},
    {"name": "Interior Design", "description": "Space planning and aesthetics"},
    {"name": "Fashion Design", "description": "Apparel design and trends"},
    {"name": "Culinary Arts", "description": "Professional cooking techniques"},
    {"name": "Photography", "description": "Master DSLR and composition"},
    {"name": "Music Theory", "description": "Fundamentals of melody and harmony"},
    {"name": "Acting", "description": "Theater and film performance skills"},
    {"name": "Yoga Instruction", "description": "Teach yoga and mindfulness"},
    {"name": "Fitness Training", "description": "Design workout programs"},
    {"name": "Nutrition Science", "description": "Diet and health optimization"}
] 

async def prefill_topics():
    existing_topics = await topics_collection.count_documents({})
    if existing_topics == 0:
        await topics_collection.insert_many(topics_data)
        print("✅ Topics inserted successfully")
    else:
        print("⚠️ Topics already exist, skipping insertion.")

# Run the prefill function
asyncio.run(prefill_topics())
