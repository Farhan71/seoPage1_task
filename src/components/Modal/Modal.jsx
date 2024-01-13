import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
const Modal = ({ onClose, card }) => {
  const modalRef = useRef();
  const [files, setFiles] = useState([]);
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const uniqueNewFiles = Array.from(selectedFiles).filter(
      (newFile) =>
        !files.some((existingFile) => existingFile.name === newFile.name)
    );
    setFiles((prevFiles) => [...prevFiles, ...Array.from(uniqueNewFiles)]);
  };
  const getFileExtension = (fileName) => {
    return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
  };
  const handleUpload = () => {
    files.forEach((file) => {
      const formData = new FormData();
      const filename = card.id + "_" + Date.now() + "_" + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      console.log(...formData);
      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    });
    onClose();
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[1]"
    >
      <div className="mt-10 flex flex-col gap-5">
        <button onClick={onClose} className="place-self-end">
          <IoClose />
        </button>
        <div className="bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 ">
          <h1 className="text-3xl font-bold">Card Attachements</h1>
          <h2>Card ID: {card.id}</h2>
          <input type="file" multiple onChange={handleFileChange} />
          <div>
            {files.length !== 0 ? (
              <div>
                <h2>File List</h2>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>
                      <strong>File {index + 1}:</strong> {file.name} (Extension:{" "}
                      {getFileExtension(file.name)})
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpload}
            >
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};
export default Modal;
