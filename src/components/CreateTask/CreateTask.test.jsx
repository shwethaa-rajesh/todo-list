import { fireEvent, render, screen } from "@testing-library/react";
import CreateTask from "./CreateTask";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MOCK_LISTS } from "../../mocks/list";

describe("Create List", () => {
  const mockSetListData = jest.fn();
  const component = (
    <MemoryRouter initialEntries={[`/add-list`]}>
      <Routes>
        <Route
          path={`/add-list`}
          element={<CreateTask label='List' onCreateList={mockSetListData} />}
        ></Route>
        <Route
          path={`/view-lists`}
          element={<div>Mock List Page</div>}
        ></Route>
      </Routes>
    </MemoryRouter>
  );

  beforeEach(() => {
    mockSetListData.mockClear();
  });

  it("should update list name when input text is changed", () => {
    render(component);
    const mockListName = "Test List Name";
    expect(screen.getByTestId("testId-listNameTextInput")).toHaveAttribute(
      "value",
      ""
    );
    fireEvent.change(screen.getByTestId("testId-listNameTextInput"), {
      target: { value: mockListName },
    });
    expect(screen.getByTestId("testId-listNameTextInput")).toHaveAttribute(
      "value",
      mockListName
    );
    expect(mockSetListData).not.toHaveBeenCalled();
  });
  it("should display text when label prop is passed", () => {
    render(component);
    expect(screen.getByText('List')).toBeTruthy();
    expect(screen.queryByText('Ltst')).toBeFalsy();
    fireEvent.click(screen.queryByText('Submit'));
    //expect(screen.queryByText('Submit')).toBeFalsy();

   });

  it("should add new list with entered name when save button is clicked", () => {
    render(component);
    const mockTaskTitleText = "Test List Save";
    fireEvent.change(screen.getByTestId("testId-listNameTextInput"), {
      target: { value: mockTaskTitleText },
    });
    expect(mockSetListData).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("Submit"));
    expect(mockSetListData).toHaveBeenCalledTimes(1);
    expect(mockSetListData).toHaveBeenCalledWith(
      {
        
        name: "Test List Save",
        tasks: [
        ],
      }
    );
  });
});


describe("Create Task", () => {
    const mockSetListData = jest.fn();
    const component = (
      <MemoryRouter initialEntries={[`/task`]}>
        <Routes>
          <Route
            path={`/task`}
            element={<CreateTask label='Task' onCreateTask={mockSetListData} taskFunction="create" listId={1} task={{}}/>}
          ></Route>
          <Route
            path={`/lists`}
            element={<div>Mock List Page</div>}
          ></Route>
        </Routes>
      </MemoryRouter>
    );
  
    beforeEach(() => {
      mockSetListData.mockClear();
    });
  
    it("should update task title input value when input text is changed", () => {
      render(component);
      const mockListName = "Test Task Name";
      expect(screen.getByTestId("testId-listNameTextInput")).toHaveAttribute(
        "value",
        ""
      );
      fireEvent.change(screen.getByTestId("testId-listNameTextInput"), {
        target: { value: mockListName },
      });
      expect(screen.getByTestId("testId-listNameTextInput")).toHaveAttribute(
        "value",
        mockListName
      );
      expect(mockSetListData).not.toHaveBeenCalled();
    });
  
    it("should return a new task object when title is saved", () => {
      render(component);
      const mockTaskTitleText = "Test Task Save";
      fireEvent.change(screen.getByTestId("testId-listNameTextInput"), {
        target: { value: mockTaskTitleText },
      });
      expect(mockSetListData).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText("Submit"));
      expect(mockSetListData).toHaveBeenCalledTimes(1);
      expect(mockSetListData).toHaveBeenCalledWith({title:"Test Task Save"},1);
    });
  });

 
describe("Edit Task", () => {
     
    const mockSetListData = jest.fn();
    const component = (
      <MemoryRouter initialEntries={[`/task`]}>
        <Routes>
          <Route
            path={`/task`}
            element={<CreateTask label='Task' onEditList={mockSetListData} taskFunction="edit" listId={1} task={MOCK_LISTS[0].tasks[0]}/>}
          ></Route>
          <Route
            path={`/lists`}
            element={<div>Mock List Page</div>}
          ></Route>
        </Routes>
      </MemoryRouter>
    );
  
    beforeEach(() => {
      mockSetListData.mockClear();
    });
  
    it("should update task title input value when input text is changed", () => {
      render(component);
      const mockListName = "Test Edit Name";
      fireEvent.change(screen.getByTestId("testId-listNameTextInput"), {
        target: { value: mockListName },
      });
      expect(screen.getByTestId("testId-listNameTextInput")).toHaveAttribute(
        "value",
        mockListName
      );
      expect(mockSetListData).not.toHaveBeenCalled();
    });
    it("should have initial task value set as previous title name", () => {
        render(component);
        expect(screen.getByTestId("testId-listNameTextInput")).toHaveAttribute(
          "value",
          "walk"
        );
       
        expect(mockSetListData).not.toHaveBeenCalled();
      });
    
  
    it("should return a new task object with the same key when title is updated", () => {
      render(component);
      const mockTaskTitleText = "Test Title Edit";
      fireEvent.change(screen.getByTestId("testId-listNameTextInput"), {
        target: { value: mockTaskTitleText },
      });
      expect(mockSetListData).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText("Submit"));
      expect(mockSetListData).toHaveBeenCalledTimes(1);
      expect(mockSetListData).toHaveBeenCalledWith({title:"Test Title Edit",key:1},1);
    });
  }); 