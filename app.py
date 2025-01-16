from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load pre-trained GPT-2 model and tokenizer
model_name = "gpt2"  # You can use "gpt2-medium", "gpt2-large", etc.
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input text from the request
    data = request.json
    prefix = data.get('prefix', '')
    print("Received prefix:", prefix)  # Debug statement

    # Tokenize the input text
    inputs = tokenizer.encode(prefix, return_tensors="pt")

    # Create attention mask
    attention_mask = torch.ones_like(inputs)

    # Generate the next word with adjusted parameters
    outputs = model.generate(
        inputs,
        max_length=inputs.shape[1] + 1,  # Generate one additional token
        do_sample=True,                  # Enable sampling
        temperature=0.7,                 # Lower temperature for less randomness
        top_k=50,                        # Limit to top 50 tokens
        top_p=0.9,                       # Use nucleus sampling
        attention_mask=attention_mask,   # Set attention mask
        pad_token_id=tokenizer.eos_token_id  # Set pad token id to end-of-sequence token
    )

    # Decode the predicted word
    next_word = tokenizer.decode(outputs[0, -1], skip_special_tokens=True)
    print("Predicted next word", next_word)  # Debug statement

    # Return the predicted word
    return jsonify({'next_word': next_word})

if __name__ == '__main__':
    app.run(debug=True)