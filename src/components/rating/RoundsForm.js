import React from "react"
import { Form, Field } from "react-final-form"

import { RenderCheckbox } from "../shared/FormInput"

const RoundsForm = props => (
  <Form onSubmit={props.onSubmit}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit}>
        <FieldArray name="rounds" component={Rounds} />
        <div className="row rating">
          <div className="col-md-6">
            <Field
              name="byRoundsOnly"
              type="checkbox"
              component={RenderCheckbox}
              normalize={v => !!v}
              label="Ohita väylien määrä laskussa"
            />
          </div>
        </div>
        <div className="row rating">
          <div className="col-md-2">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={submitting || pristine}
            >
              Spekuloi
            </button>
          </div>
          {props.customRating && (
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <strong>Spekuloitu rating</strong>
                </div>
                <div className="col-md-6">{props.customRating}</div>
              </div>
            </div>
          )}
        </div>
      </form>
    )}
  </Form>
)


const customRow = {
  tournament: "Oma kisa",
  link: "",
  date: "",
  round: 1,
  score: 54,
  rating: 0,
  holes: 18,
  included: true,
  doubled: true
}

const Rounds = ({ fields }) => (
  <div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Kilpailu</th>
          <th>Pvm</th>
          <th className="text-right">Kierros</th>
          <th className="text-right">Tulos</th>
          <th className="text-center">Rating</th>
          <th className="text-center">Väyliä</th>
          <th className="text-center">Mukana</th>
          <th className="text-center">Tuplana</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((d, idx) => {
          const round = fields.get(idx)
          const key = `round-${idx}`
          return (
            <tr key={key}>
              <td>
                <a target="_tournament" href={round.link}>
                  {round.tournament}
                </a>
              </td>
              <td>{round.date}</td>
              <td className="text-right">{round.round}</td>
              <td className="text-right">{round.score}</td>
              <td>
                <Field className="text-center" name={`${d}.rating`} component="input" />
              </td>
              <td>
                <Field className="text-center" name={`${d}.holes`} component="input" />
              </td>
              <td className="text-center">
                <Field
                  name={`${d}.included`}
                  label=""
                  type="checkbox"
                  component={RenderCheckbox}
                  normalize={v => !!v}
                />
              </td>
              <td className="text-center">
                <Field
                  name={`${d}.doubled`}
                  label=""
                  type="checkbox"
                  component={RenderCheckbox}
                  normalize={v => !!v}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>

    <div className="row">
      <div className="col-md-2">
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => fields.push(customRow)}
        >
          +
        </button>
      </div>
    </div>
  </div>
)

export default RoundsForm
