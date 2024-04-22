import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";

export default function Welcome() {
  const { theme, setTheme } = useContext(ThemeContext)

  const notify = () => toast.info("Hello there!");

  useEffect(() => {
    axios.get('/api/').then(res => console.log(res.data))
  }, [])

  return (
    <div className={`h-screen flex items-center justify-center flex-col  bg-${theme === 'light' ? 'slate-100' : 'slate-800'}`}>
      <h1 onClick={() => {
        if (theme === 'light') {
          setTheme('dark');
        } else {
          setTheme('light');
        }

        console.log(theme);

      }} className="text-3xl font-bold underline">Welcome in my frontend!</h1>
      <button onClick={notify}>Toast me!</button>
    </div>
  )
}
