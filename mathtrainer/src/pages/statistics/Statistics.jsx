import Accordion from 'react-bootstrap/Accordion';
import "./statistics.css"


function Statistics() {

    const addition = JSON.parse(localStorage.getItem("AdditionTop")) || [];
    const subtraction = JSON.parse(localStorage.getItem("SubtractionTop")) || [];
    const multiplication = JSON.parse(localStorage.getItem("MultiplicationTop")) || [];
    const division = JSON.parse(localStorage.getItem("DivisionTop")) || [];
    const totalgames = JSON.parse(localStorage.getItem("totalgames")) || [];

  return (
    
    <div>
        <div> You have played {totalgames} games so far! Great!</div>
        
    <Accordion className="main" alwaysOpen >
        
      {addition.length >= 1 ? <div> <Accordion.Item eventKey="0" >
        <Accordion.Header>Addition</Accordion.Header>
        <Accordion.Body>
            <div>You played addition XXXX times</div>
            <div>TOP 10:</div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th> 
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {addition.map(one =>
                        <tr key={one}>
                            <td>{one.date}</td>
                            <td>{one.points}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Accordion.Body>
      </Accordion.Item></div> : undefined}

      {subtraction.length >= 1 ? <div> <Accordion.Item eventKey="1">
        <Accordion.Header>Subtraction</Accordion.Header>
        <Accordion.Body>
            <div>You played subtraction XXXX times</div>
            <div>TOP 10:</div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th> 
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {subtraction.map(one =>
                        <tr key={one}>
                            <td>{one.date}</td>
                            <td>{one.points}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Accordion.Body>
      </Accordion.Item></div> : undefined}


      {multiplication.length >= 1 ? <div> <Accordion.Item eventKey="2">
        <Accordion.Header>Multiplication</Accordion.Header>
        <Accordion.Body>
            <div>You played multiplication XXXX times</div>
            <div>TOP 10:</div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th> 
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {multiplication.map(one =>
                        <tr key={one}>
                            <td>{one.date}</td>
                            <td>{one.points}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Accordion.Body>
      </Accordion.Item></div> : undefined}

      {division.length >= 1 ? <div> <Accordion.Item eventKey="3">
        <Accordion.Header>Division</Accordion.Header>
        <Accordion.Body>
            <div>You played division XXXX times</div>
            <div>TOP 10:</div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th> 
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {division.map(one =>
                        <tr key={one}>
                            <td>{one.date}</td>
                            <td>{one.points}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Accordion.Body>
      </Accordion.Item></div> : undefined}

    </Accordion>
    </div>
  );
}

export default Statistics;