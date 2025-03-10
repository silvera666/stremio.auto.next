(function() {
    function saveCurrentEpisodeUrl() {
        let currentUrl = window.location.href;
        localStorage.setItem('lastEpisodeUrl', currentUrl);
    }

    function getNextEpisodeUrl(currentUrl) {
        let match = currentUrl.match(/(tt\d+%3A\d+%3A)(\d+)/);
        if (match) {
            let episodeNumber = parseInt(match[2], 10);
            let nextEpisodeNumber = episodeNumber + 1;
            return currentUrl.replace(match[0], match[1] + nextEpisodeNumber);
        }
        return null;
    }

    function checkAndSwitchEpisode() {
        let video = document.querySelector('video');
        if (video) {
            let remainingTime = video.duration - video.currentTime;
            if (remainingTime < 30) {
                let lastEpisodeUrl = localStorage.getItem('lastEpisodeUrl');
                if (lastEpisodeUrl) {
                    let nextEpisodeUrl = getNextEpisodeUrl(lastEpisodeUrl);
                    if (nextEpisodeUrl) {
                        window.location.href = nextEpisodeUrl;
                    }
                }
            }
        }
    }

    setInterval(saveCurrentEpisodeUrl, 5000);
    setInterval(checkAndSwitchEpisode, 1000);
})();
