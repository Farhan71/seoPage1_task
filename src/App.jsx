
import './App.css';
import Cards from './components/Cards/Cards';
function App() {

  return (
    <>
       <div className='flex overflow-auto p-8'>
            <Cards dataFileName = "incompleteCardData" stageName = "Incomplete" flagColor="#D21010" ></Cards>
            <Cards dataFileName = "todoCardData" stageName="To Do" flagColor="#00B5FF" ></Cards>
            <Cards dataFileName = "doingCardData" stageName="Doing" flagColor="#FFE700" ></Cards>
            <Cards dataFileName = "underReviewCardData" stageName="Under Review" ></Cards>
            <Cards dataFileName = "completedCardData" stageName="Completed" ></Cards>
            <Cards dataFileName = "overdueCardData" stageName="Overdue" ></Cards>
           
       </div>

    </>
  )
}

export default App
