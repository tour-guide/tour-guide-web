INSERT INTO stories (storyName, location, storyCity, storyState, storyTransit, info, storyImage, UserId)
VALUES 
("The Civil War in Wilmington"
, "Fort Anderson"
, "Winnabow"
, "NC"
, "walking"
, "Dating back to 1726, Brunswick Town was the first permanent settlement in the Cape Fear region. It was later destroyed by the British, only to arise from the ashes with a new name during the Civil War. Learn about the many roles Fort Anderson has played in North Carolina and US history."


INSERT INTO chapters (chapNumber, chapName, chapLocation, chapCity, chapState, chapAudio, StoryId)
VALUES
(1, "Lay of the Land", "Fort Anderson Visitor Center", "Winnabow", "NC", chapAudio, StoryId),
(2, "The Canon", "Fort Anderson Visitor Center", "Winnabow", "NC", chapAudio, StoryId)
