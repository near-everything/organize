import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import MainHeader from "../components/MainHeader";

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [dispatch]);

  const organizeRequests = (id) => {
    navigate(`/requests`);
  };

  const organizeItems = (id) => {
    navigate(`/items`);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="flex flex-col flex-1 w-full">
        <MainHeader />
        <main className="h-full overflow-y-auto">
          <div className="flex flex-col justify-center items-center h-full text-center">
            <p className="font-bold text-7xl font-sans text-yellow-600">
              organize
            </p>
            <p className="text-4xl font-light">EVERYTHING</p>
            <br/>
            <div className="flex">
              <Button className="w-1/2 h-16 mr-2" onClick={organizeRequests}>
                items
              </Button>

              <Button className="w-1/2 h-16 ml-2" onClick={organizeItems}>
                requests
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
