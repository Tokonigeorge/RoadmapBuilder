from .models.roadmap import RoadmapFormData
import os
import openai
from dotenv import load_dotenv

load_dotenv()


#OpenAI setup
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise EnvironmentError("OPENAI_API_KEY environment variable not set")

client = openai.OpenAI(api_key=api_key)

def generate_roadmap(data: RoadmapFormData):
    """Generates a structured roadmap with topic breakdown and resources."""
    
    prompt = f"""
     **ROLE**: Expert Curriculum Designer with 10+ years experience creating technical learning paths.

    **MUST FOLLOW THESE RULES**:
    1. Generate exactly 3-5 resources per topic (2 free, 2 paid, 1 optional)
    2. Titles MUST be specific:e.g Capitalism and Liberatarianism if the focus is on political philosophy not "deeper dive into political philosophy"
    3. Schedule sessions pattern within {data.timeFrame}
    4. Include both conceptual and practical resources
    5. This is a roadmap that should be comprehensive and cover all the topics in the learning topic. Identify all the topics that are related to the learning topic and add them to the roadmap.
    6. it should not just be a list of 5 topics. it should be a comprehensive roadmap that covers all the topics in the learning topic.
    7. Add milestones to the roadmap. Start with 10% completion, 25% completion, 50% completion, 75% completion, and 100% completion.

    **User Input:**
    - **Topic:** {data.learningTopic}
    - **Time Frame:** {data.timeFrame}

    **Output Structure:**
    - The roadmap should be divided into **topics**.
    - And each topic should have a list of resources.
    - For each resource, recommend **both free and paid resources**.
    - Indicate whether a particular topic is a milestone.
    - Indicate whether a particular topic is a prerequisite for another topic.
    - Indicate whether a particular topic is optional.

    **Format Response as JSON**:
    ```json
    {{
    
    "topic": "{data.learningTopic}",
    "topics": [
    {{
    "title": "title",
    "milestone": "milestone",
    "prerequisite_topic": "prerequisite topic",
    "optional": "optional",
    "resources": [
    {{
    "title": "resource title",
    "type": "resource type",
    "url": "resource url",
    "cost": "resource cost",
    "duration": "resource duration",
    "learning_style": ["learning style 1", "learning style 2"]
    }}
    ]
    }},

    }}
     **EXAMPLES**:
    - Resource title: "Book: Advanced React Patterns (Kent C. Dodds, 2024)"
    - Session: "3h45m total = 45m theory + 2h practice + 1h project"
    """
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": "You are an AI that generates personalized learning roadmaps. Do not hallucinate or make up resources and topics. Only use the ones that are relevant to the user's input."}
        ],
    
        temperature=0.3,
    )
    return response.choices[0].message.content


def generate_resources(data: RoadmapFormData):
    """Generates a list of resources for a given topic."""
    prompt = f"""
    **ROLE**: Expert Curriculum Designer with 10+ years experience creating technical learning paths. You're to generate a list of resources for a given topic. Go from bottom to top.
    

    **MUST FOLLOW THESE RULES**:
    1. Generate no less than 15 resources for {data.learningTopic}.
    2. The resources should be a mix of free and paid resources.
    3. The resources should be a mix of conceptual and practical resources.
    4. The resources should be a mix of text, video, and audio resources.
    5. The resources should be a mix of resources that are easy to understand and resources that are more challenging.
    6. The resources should be a mix of resources that are more theoretical and resources that are more practical.
    7. The resources should be a mix of resources that are more conceptual and resources that are more practical.

      **User Input:**
    - **Topic:** {data.learningTopic}

    **Format Response as JSON**:
    ```json
    {{
    "topic": "{data.learningTopic}",
    "resources": [
    {{
    "title": "resource title",
    "type": "resource type",
    "url": "resource url",
    "cost": "resource cost",    
    "duration": "resource duration",
    "learning_style": ["learning style 1", "learning style 2"]
    }}
    ]
    }}
     **EXAMPLES**:
    - Resource title: "Book: Advanced React Patterns (Kent C. Dodds, 2024)"
    - Session: "3h45m total = 45m theory + 2h practice + 1h project"
    """ 
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": prompt},
        ],
  
        temperature=0.3,
    )
    return response.choices[0].message.content
