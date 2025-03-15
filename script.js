document.addEventListener("DOMContentLoaded", function() {
    let displayName = document.getElementById("displayName");
    let displayBirthday = document.getElementById("displayBirthday");
    let displayBio = document.getElementById("displayBio");
    let displayQuote = document.getElementById("displayQuote");
    let displayPic = document.getElementById("displayPic");
    let createProfile = document.getElementById("createProfile");
    let postTweet = document.getElementById("postTweet");
    let tweetContainer = document.getElementById("tweetContainer");


    displayName?.append(localStorage.getItem("name"));
    displayBirthday?.append("🎂 " + new Date(localStorage.getItem("birthday")).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
    displayBio?.append(localStorage.getItem("bio"));
    displayQuote?.append('"' + localStorage.getItem("quote") + '"');
    displayPic?.setAttribute("src", localStorage.getItem("profilePic"));


    createProfile?.addEventListener("click", function() {
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("birthday", document.getElementById("birthday").value);
        localStorage.setItem("bio", document.getElementById("bio").value);
        localStorage.setItem("quote", document.getElementById("quote").value);

        let file = document.getElementById("profilePic").files[0];
        let reader = new FileReader();
        reader.onload = (e) => localStorage.setItem("profilePic", e.target.result);
        reader.readAsDataURL(file);

        window.location.href = "feed.html";
    });


    postTweet?.addEventListener("click", function() {
        let tweetText = document.getElementById("tweetInput").value.trim();
        tweetText && (() => {
            let tweet = document.createElement("div");
            tweet.classList.add("tweet", "border-bottom", "py-2");

            let tweetContent = document.createElement("p");
            tweetContent.innerText = tweetText;

            let likeBtn = document.createElement("button");
            likeBtn.classList.add("like-btn", "btn", "btn-outline-danger", "btn-sm", "mt-1");
            likeBtn.innerText = "❤️ Like";
            likeBtn.onclick = () => likeBtn.innerText = "❤️ Liked";

            tweet.append(tweetContent, likeBtn);
            tweetContainer?.prepend(tweet);

            document.getElementById("tweetInput").value = "";
        })();
    });
});
