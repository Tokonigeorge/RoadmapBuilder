from .models import RoadmapFormData
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


#OpenAI setup
# api_key = os.getenv("OPENAI_API_KEY")
# if not api_key:
#     raise EnvironmentError("OPENAI_API_KEY environment variable not set")
# openai.api_key = api_key
client = OpenAI()

def generate_roadmap(data: RoadmapFormData):
    """Generates a structured, weekly AI-driven roadmap with topic breakdown and resources."""
    
    prompt = f"""
     **ROLE**: Expert Curriculum Designer with 10+ years experience creating technical learning paths.

    **MUST FOLLOW THESE RULES**:
    1. Generate exactly 3-5 resources per day (2 free, 2 paid, 1 optional)
    2. Titles MUST be specific:e.g Capitalism and Liberatarianism if the focus is on political philosophy not "deeper dive into political philosophy"
    3. Schedule sessions based on {data.frequency} pattern within {data.timeFrame}
    4. Daily breakdowns must show specific subtopics
    5. Include both conceptual and practical resources

    **User Input:**
    - **Topic:** {data.learningTopic}
    - **Total Time:** {data.timeCommitment}
    - **Study Frequency:** {data.frequency}
    - **Time Frame:** {data.timeFrame}
    - **Learning Style Preferences:** {'Visual' if data.visual else ''} {'Auditory' if data.auditory else ''} {'Kinesthetic' if data.kinesthetic else ''}

    **Output Structure:**
    - The roadmap should be divided into **weekly sections**.
    - Each week should have topics assigned based on the user's **learning frequency**.
    - For each session, recommend **both free and paid resources**.

    **Format Response as JSON**:
    ```json
    {{
    "roadmap": {{
    "topic": "{data.learningTopic}",
    "schedule":{{
    "frequencyPattern":"array of specific days of the week",
    "sessionDuration":"calculated hours per session"
    }}
    }},
      "weeks": [
        {{
          "week_number": 1,
                    "focus_area": "specific sub-topic",
                    "days": {{
                        "day_1": {{
                        "day": "Monday",
                            "date": "calculated date",
                            "topics": ["specific concept 1", "concept 2"],
                            "resources": [
                                {{
                                    "title": "Video: Intermediate Python Functions (Corey Schafer, 2023)",
                                    "type": "video",
                                    "url": "https://...",
                                    "cost": "free",
                                    "duration": "1h15m",
                                    "learning_style": ["visual", "kinesthetic"]
                                }}
                            ]
                        }}
                    }}
        }},
        ...
      ]
    }}
     **EXAMPLES**:
    - For "every other day": ["Mon", "Wed", "Fri", "Sun"]
    - Resource title: "Book: Advanced React Patterns (Kent C. Dodds, 2024)"
    - Session: "3h45m total = 45m theory + 2h practice + 1h project"
    """
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": "You are an AI that generates personalized learning roadmaps. Do not hallucinate or make up resources and topics. Only use the ones that are relevant to the user's input."}
        ],
        temperature=0.3,
    )
    return response.choices[0].message.content

