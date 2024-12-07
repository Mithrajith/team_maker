from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/generate-teams', methods=['POST'])
def generate_teams():
    """
    Endpoint to generate random teams.
    """
    try:
        data = request.json
        total_students = data.get('total_students')
        team_size = data.get('team_size')
        
        # Validate inputs
        if not isinstance(total_students, int) or not isinstance(team_size, int):
            return jsonify({"error": "Inputs must be integers"}), 400
        if total_students <= 0 or team_size <= 0:
            return jsonify({"error": "Inputs must be positive integers"}), 400
        if total_students < team_size:
            return jsonify({"error": "Team size cannot exceed total students"}), 400
        
        # Generate and shuffle student IDs
        student_ids = list(range(1, total_students + 1))
        random.shuffle(student_ids)
        teams = [student_ids[i:i + team_size] for i in range(0, len(student_ids), team_size)]
        
        return jsonify({"teams": teams}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
#host="0.0.0.0", port="8080",