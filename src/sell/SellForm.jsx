import { Form, FormFeedback, Input, Label, Spinner } from "reactstrap";
import "./sell_form.css";
import { useContext, useRef, useState } from "react";
import { Alert, PrimaryButton } from "../styles.jsx";
import { AppContext } from "../context.jsx";
import { ConfirmationModal } from "../common";
import { useNavigate } from "react-router-dom";
import ImageUploader from "./ImageUploader.jsx";
import { v4 as uuidv4 } from "uuid";

const SellForm = ({ category, breed }) => {
  const navigate = useNavigate();
  const {
    activeUser,
    cattlesList,
    setCattlesList,
    repsList,
    setRepsCattlesList,
    setNotificationsList,
  } = useContext(AppContext);
  const [cattleInfo, setCattleInfo] = useState({
    age: "",
    gender: "female",
    weight: "",
    price: "",
    milk: "",
    lactation: "",
    description: "",
  });
  const inputRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => setShowAlert(!showAlert);

  const toggleModal = () => setOpenModal(!openModal);

  const updatecattleInfo = (value, key) => {
    setCattleInfo({
      ...cattleInfo,
      [key]: value,
    });
  };

  const uploadImage = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const apiUrl = "https://api.imgbb.com/1/upload";

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("image", file);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) return data.data.url;
      else {
        appendAlert("Something went wrong. Please try again.", "danger");
      }
    } catch (error) {
      appendAlert("Something went wrong. Please try again.", "danger");
    }
  };

  const saveForm = async () => {
    if (
      activeUser.address === "" ||
      activeUser.district === "select_district" ||
      activeUser.pincode === ""
    )
      toggleModal();
    else {
      setIsLoading(true);

      const files = inputRef.current.files;

      if (files.length === 0) {
        setIsLoading(false);
        toggleAlert();
        return;
      }

      const cattleId = uuidv4();
      const notificationId = uuidv4();
      const messageTitle = `New ${breed} ${category} has been uploaded`;
      const message = `It is in ${activeUser.address}, ${activeUser.district}, ${activeUser.pincode}`;

      const stock = cattlesList
        .filter((e) => e.breed == breed)
        .length.toString()
        .padStart(3, "0");

      const id = (category[0] + breed[0] + parseInt(stock) + 1).toUpperCase();

      const repId =
        repsList.find((e) => e.district === activeUser.district)?.repId ||
        "Rep1";

      const imagesLink = await Promise.all(
        Object.keys(files).map((key) => uploadImage(files[key]))
      );

      setCattlesList((prev) => [
        ...prev,
        {
          cattle: category,
          breed,
          age: cattleInfo.age,
          gender: cattleInfo.gender,
          weight: cattleInfo.weight,
          milk: cattleInfo.gender === "female" ? cattleInfo.milk : null,
          price: cattleInfo.price,
          lactation:
            cattleInfo.gender === "female" ? cattleInfo.lactation : null,
          description: cattleInfo.description.trim(),
          images: imagesLink,
          id,
          cattleId,
          userId: activeUser.phone,
          date: new Date().toLocaleDateString(),
        },
      ]);

      setRepsCattlesList((prev) => [...prev, { cattleId, repId }]);

      setNotificationsList((prev) => [
        ...prev,
        {
          notificationId,
          messageTitle,
          message,
          repId,
          readStatus: false,
        },
      ]);

      setIsLoading(false);
      setCattleInfo({
        age: "",
        gender: "female",
        weight: "",
        price: "",
        milk: "",
        lactation: "",
        description: "",
      });
      navigate("/profile");
    }
  };

  const enableSaveForm =
    cattleInfo.age.length > 0 &&
    cattleInfo.age.length < 3 &&
    cattleInfo.weight.length > 1 &&
    cattleInfo.weight.length < 5 &&
    cattleInfo.price.length > 0 &&
    cattleInfo.price.length < 8 &&
    (cattleInfo.gender === "female"
      ? cattleInfo.milk.length > 0 &&
        cattleInfo.milk.length < 3 &&
        cattleInfo.lactation.length == 1
      : true);

  return (
    <>
      <Alert
        isOpen={showAlert}
        toggle={toggleAlert}
        color={"danger"}
        role="alert"
      >
        Atleast 1 photo of cattle required
      </Alert>
      <div className="form-container">
        <Form>
          <div className="form-row">
            <div className="form-field">
              <Label for="age">Age</Label>
              <Input
                type="number"
                id="age"
                value={cattleInfo.age}
                onChange={(ev) => updatecattleInfo(ev.target.value, "age")}
                invalid={
                  cattleInfo.age.length > 0 && !/^\d{1,2}$/.test(cattleInfo.age)
                }
                valid={
                  cattleInfo.age.length > 0 && /^\d{1,2}$/.test(cattleInfo.age)
                }
                aria-label="Age"
                inputMode="numeric"
              />
              <FormFeedback>
                {cattleInfo.age.length == 0
                  ? "Required"
                  : "Min 1 - Max 2 digits"}
              </FormFeedback>
            </div>
            <div className="form-field">
              <Label for="gender">Gender</Label>
              <Input
                type="select"
                id="gender"
                value={cattleInfo.gender}
                onChange={(ev) => updatecattleInfo(ev.target.value, "gender")}
                aria-label="Gender"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Input>
            </div>
            <div className="form-field">
              <Label for="weight">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                value={cattleInfo.weight}
                onChange={(ev) => updatecattleInfo(ev.target.value, "weight")}
                invalid={
                  cattleInfo.weight.length > 0 &&
                  !/^\d{2,4}$/.test(cattleInfo.weight)
                }
                valid={
                  cattleInfo.weight.length > 0 &&
                  /^\d{2,4}$/.test(cattleInfo.weight)
                }
                aria-label="Weight"
                inputMode="numeric"
              />
              <FormFeedback>
                {cattleInfo.weight.length == 0
                  ? "Required"
                  : "Min 2 - Max 4 digits"}
              </FormFeedback>
            </div>
            <div className="form-field">
              <Label for="price">Price (Rs.)</Label>
              <Input
                type="number"
                id="price"
                value={cattleInfo.price}
                onChange={(ev) => updatecattleInfo(ev.target.value, "price")}
                invalid={
                  cattleInfo.price.length > 0 &&
                  !/^\d{1,7}$/.test(cattleInfo.price)
                }
                valid={
                  cattleInfo.price.length > 0 &&
                  /^\d{1,7}$/.test(cattleInfo.price)
                }
                aria-label="Price"
                inputMode="numeric"
              />
              <FormFeedback>
                {cattleInfo.price.length == 0
                  ? "Required"
                  : "Min 1 - Max 7 digits"}
              </FormFeedback>
            </div>
            {cattleInfo.gender === "female" && (
              <>
                <div className="form-field">
                  <Label for="milk">Milk per day (litres)</Label>
                  <Input
                    type="number"
                    id="milk"
                    value={cattleInfo.milk}
                    onChange={(ev) => updatecattleInfo(ev.target.value, "milk")}
                    invalid={
                      cattleInfo.milk.length > 0 &&
                      !/^\d{1,2}$/.test(cattleInfo.milk)
                    }
                    valid={
                      cattleInfo.milk.length > 0 &&
                      /^\d{1,2}$/.test(cattleInfo.milk)
                    }
                    aria-label="Milk"
                    inputMode="numeric"
                  />
                  <FormFeedback>
                    {cattleInfo.milk.length == 0
                      ? "Required"
                      : "Min 1 - Max 2 digits"}
                  </FormFeedback>
                </div>
                <div className="form-field">
                  <Label for="lactation">Lactation</Label>
                  <Input
                    type="number"
                    id="lactation"
                    value={cattleInfo.lactation}
                    onChange={(ev) =>
                      updatecattleInfo(ev.target.value, "lactation")
                    }
                    invalid={
                      cattleInfo.lactation.length > 0 &&
                      !/^\d{1}$/.test(cattleInfo.lactation)
                    }
                    valid={
                      cattleInfo.lactation.length > 0 &&
                      /^\d{1}$/.test(cattleInfo.lactation)
                    }
                    aria-label="Lactation"
                    inputMode="numeric"
                  />
                  <FormFeedback>
                    {cattleInfo.lactation.length == 0
                      ? "Required"
                      : "Max 1 digit"}
                  </FormFeedback>
                </div>
              </>
            )}
          </div>
          <div className="mt-2">
            <Label for="description"> Description </Label>
            <Input
              type="textarea"
              id="description"
              value={cattleInfo.description}
              onChange={(ev) =>
                updatecattleInfo(ev.target.value, "description")
              }
            ></Input>
          </div>
          <div className="mt-2">
            <Label for="images">Upload Photos</Label>
            <span className="text-secondary">(Max: 2MB / photo)</span>
            <ImageUploader inputRef={inputRef} />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <PrimaryButton
              className="d-flex"
              disabled={!enableSaveForm || isLoading}
              type="button"
              onClick={saveForm}
            >
              {isLoading ? (
                <>
                  <Spinner className="me-2" size="sm">
                    Loading...
                  </Spinner>
                  <span>Loading</span>
                </>
              ) : (
                "SUBMIT"
              )}
            </PrimaryButton>
          </div>
        </Form>
      </div>
      <ConfirmationModal
        isOpen={openModal}
        toggle={toggleModal}
        onConfirm={() => navigate("/profile")}
        message="Your're not updated you address completely. Click Yes to go to the Profile page to update it."
        heading="Profile Updation"
      />
    </>
  );
};

export default SellForm;
