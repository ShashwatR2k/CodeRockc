import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import AddButton from "../components/AddButton";
import { useEditor } from "../context/AppContext";
import ShowCodeList from "../components/ShowCodeList";
import WebD from "../components/WebD";
import ShowTitle from "../components/ShowTitle";
import { Button } from "@material-ui/core";

import * as firebase from "firebase/app";

const Home = () => {
  const { open, getCodes, isObjectEmpty, handleBack, getTime, signAnonymous } =
    useEditor();

  useEffect(() => {
    getCodes();
    getTime();
  }, []);

  return (
    <Layout
      title="Home"
      content="Enter code in either language and get the output for the entered code"
    >
      <div class="h-full">
        <div class="flex flex-row w-full justify-center">
          <div class="basis-1/3 w-full">
            {!isObjectEmpty(open) && (
              <Button variant="contained" color="primary" onClick={handleBack}>
                {"Go Back"}
              </Button>
            )}
          </div>
          <div class="basis-1/3 text-white w-full">
            {!isObjectEmpty(open) && <ShowTitle />}
          </div>
          <div class="basis-1/3 w-full justify-end display: grid h-1/3">
            {" "}
            <AddButton />
          </div>
        </div>

        {!isObjectEmpty(open) && (
          <div class="h-full">
            {" "}
            <WebD />
          </div>
        )}

        {isObjectEmpty(open) && <ShowCodeList />}
      </div>
    </Layout>
  );
};

export default Home;
