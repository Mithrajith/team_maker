document.getElementById('teamForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    const totalStudents = parseInt(document.getElementById('totalStudents').value);
    const teamSize = parseInt(document.getElementById('teamSize').value);
    const output = document.getElementById('output');
  
    // Clear previous output
    output.innerHTML = '';
  
    // Validate inputs
    if (isNaN(totalStudents) || isNaN(teamSize) || totalStudents <= 0 || teamSize <= 0) {
      output.innerHTML = '<p class="error">Please enter positive numbers for both fields.</p>';
      return;
    }
    if (teamSize > totalStudents) {
      output.innerHTML = '<p class="error">Team size cannot be greater than the total number of students.</p>';
      return;
    }
  
    // Prepare data to send to backend
    const requestData = {
      total_students: totalStudents,
      team_size: teamSize
    };
  
    // Make POST request to Flask API
    fetch('http://127.0.0.1:5000/generate-teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        output.innerHTML = `<p class="error">${data.error}</p>`;
      } else {
        // Display the generated teams
        data.teams.forEach((team, index) => {
          const teamDiv = document.createElement('div');
          teamDiv.classList.add('team');
          teamDiv.innerHTML = `
            <h3>Team ${index + 1}</h3>
            <p>${team.join(', ')}</p>
          `;
          output.appendChild(teamDiv);
        });
      }
    })
    .catch(error => {
      output.innerHTML = `<p class="error">There was an error: ${error.message}</p>`;
    });
  });
  