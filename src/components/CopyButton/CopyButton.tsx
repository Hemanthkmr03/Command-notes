import './CopyButton.scss';


export default function CopyButton() {
    const textToCopy = "Hello, this text will be copied!";

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert("Copied!"))
            .catch(() => alert("Copy failed"));
    };

    return (
        <button onClick={handleCopy}>
            Copy
        </button>
    );
}