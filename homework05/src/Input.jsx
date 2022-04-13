import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function CircleForm({ callback }) {
    return (
        <form className="form p-2" onSubmit={(e) => {
            e.preventDefault()
            callback(e.target)
        }}>
            <label className="form-label" htmlFor="x">X:</label>
            <input className="form-control" type="number" name="x" placeholder="X coordinate" />
            <br />

            <label className="form-label" htmlFor="y">Y:</label>
            <input className="form-control" type="number" name="y" placeholder="Y coordinate" />
            <br />

            <label className="form-label" htmlFor="r">Radius:</label>
            <input className="form-control" type="number" name="r" placeholder="radius" />
            <br />

            <label className="form-label" htmlFor="color">Color:</label>
            <input className="form-control" type="color" name="color" />
            <br />

            {/* HTML button element behaves like input type="submit" by default */}
            <button className="btn btn-success">Create this circle</button>
        </form>
    )
}

export default function Input() {
    const [circles, setCircles] = useState([])
    const [circleForms, setCircleForms] = useState([])
    const [counter, setCounter] = useState(0)

    function spawnCircle({ x, y, r, color }) {
        setCircles(circles => [
            ...circles,
            {
                x: Number(x.value) || 0,
                y: Number(y.value) || 0,
                r: Number(r.value) || 0,
                color: color.value
            }
        ])
    }

    function createNewCircleForm() {
        setCircleForms(
            [...circleForms, <CircleForm key={counter} callback={spawnCircle} />]
        )

        setCounter(counter => counter + 1)
    }

    // your task here is to create an input form in which a user will input at least 4 fields: x, y, r and color
    // https://www.w3schools.com/react/react_forms.asp
    // be careful, first three are numbers and the third one is either a dropdown or a color picker

    // return 3 elements:
    // 1st: a button which will add another form on click, meaning a user can add more than one circle
    // 2nd: forms with submit buttons
    // 3rd: svg which will consist of circle elements whose data a user has submitted
    return (
        <div className="py-2">
            <button className="btn btn-success" onClick={createNewCircleForm}>Add another circle</button>

            <div className="d-flex flex-row flex-wrap">
                {
                    circleForms
                }
            </div>

            <svg viewBox="0 0 600 600" style={{ maxWidth: 'min(600px, 80vw)', maxHeight: 'min(600px, 80vh)' }}>
                {/* circle elements with x, y coordinate center, r radius and color color */}
                {/* if you want to be fancy, play with fills, outlines, whatever you find fitting */}
                {
                    circles.map(({ x, y, r, color }, index) => <circle key={index} cx={x} cy={y} r={r} fill={color} />)
                }
            </svg>
        </div>
    )
}