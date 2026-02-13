import google.generativeai as genai

genai.configure(api_key="AIzaSyAV4Fd08BrIRjrpHabpaAZ00nYFkxewJbI")

models = genai.list_models()

for m in models:
    print(m.name)
