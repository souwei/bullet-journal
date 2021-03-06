// import './App.css';
import styles from "./App.module.scss";
import React from "react";
// for material-ui
import "fontsource-roboto";

import Chip from "@material-ui/core/Chip";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import {
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

import ReactModal from "react-modal";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const StyledFab = withStyles({
  root: {
    position: "absolute",
    bottom: "2%",
    right: "5%",
  },
})(Fab);

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Caveat", sans-serif`,
    // "fontSize": 14,
    // "fontWeightLight": 300,
    // "fontWeightRegular": 400,
    // "fontWeightMedium": 500
  },
});

const GreenCheckbox = withStyles({
  root: {
    fontFamily: "Caveat",
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selectedDay: "",
      inputTodoText: "",
      days: {
        monday: {
          todos: [
            {
              name: "Laundry",
              done: false,
            },
            {
              name: "Genshin Resin",
              done: false,
            },
          ],
        },
        tuesday: {
          todos: [
            {
              name: "Cooking",
              done: false,
            },
            {
              name: "Dancing",
              done: false,
            },
          ],
        },
        wednesday: {
          todos: [],
        },
        thursday: {
          todos: [],
        },
        friday: {
          todos: [],
        },
        saturday: {
          todos: [],
        },
        sunday: {
          todos: [
            {
              name: "Take out recycling bin",
              done: false,
            },
          ],
        },
      },
      notes: "Get prepared and mentally ready for new job",
    };
  }

  addTodo() {
    const { days, selectedDay, inputTodoText } = this.state;

    if (days.hasOwnProperty(selectedDay) && inputTodoText !== "") {
      const updatedToDo = [
        ...days[selectedDay].todos,
        {
          name: inputTodoText,
          done: false,
        },
      ];

      const updatedDay = {
        todos: updatedToDo,
      };

      const updatedDays = { ...days };

      updatedDays[selectedDay] = updatedDay;

      this.setState({
        days: updatedDays,
        modalOpen: false,
      });
    } else {
      this.setState({ modalOpen: false });
    }
  }

  render() {
    const { days } = this.state;

    return (
      <div className="App">
        <MuiThemeProvider theme={THEME}>
          <div className={styles.test}>
            {Object.keys(days).map((day, index) => (
              <div className={styles.row}>
                <span className={styles.rowHeader}>{day} - &nbsp;</span>
                <Chip color="secondary" size="small" label={index + 1} />
                <div>
                  {days[day].todos.map((todo, toDoIndex) => (
                    <div>
                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={todo.done}
                            onChange={(event) => {
                              const newToDo = [...this.state.days[day].todos];
                              newToDo[toDoIndex].done = event.target.checked;

                              const updatedDays = { ...this.state.days };
                              updatedDays[day].todos = newToDo;

                              this.setState({ days: updatedDays });
                            }}
                            name="checkedG"
                          />
                        }
                        label={todo.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.row}>
              <span className={styles.rowHeader}>notes</span>
              <div>{this.state.notes}</div>
            </div>
          </div>
          <StyledFab
            className={styles.fab}
            color="secondary"
            aria-label="add"
            onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}
          >
            <AddIcon />
          </StyledFab>

          <ReactModal
            isOpen={this.state.modalOpen}
            contentLabel="Minimal Modal Example"
            onRequestClose={() => this.setState({ modalOpen: false })}
          >
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Day of the week
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={this.state.selectedDay}
                onChange={(event) =>
                  this.setState({ selectedDay: event.target.value })
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="monday">Monday</MenuItem>
                <MenuItem value="tuesday">Tuesday</MenuItem>
                <MenuItem value="wednesday">Wednesday</MenuItem>
                <MenuItem value="thursday">Thursday</MenuItem>
                <MenuItem value="friday">Friday</MenuItem>
                <MenuItem value="saturday">Saturday</MenuItem>
                <MenuItem value="sunday">Sunday</MenuItem>
              </Select>

              <TextField
                id="standard-full-width"
                label="Do what?"
                placeholder="i.e. Play final fantasy xiv online"
                helperText="Enter the description of the to do item"
                fullWidth
                margin="normal"
                size="medeium"
                variant="filled"
                onChange={(e) =>
                  this.setState({ inputTodoText: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <button onClick={() => this.addTodo()}>Save</button>
            <button onClick={() => this.setState({ modalOpen: false })}>
              Cancel
            </button>
          </ReactModal>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
