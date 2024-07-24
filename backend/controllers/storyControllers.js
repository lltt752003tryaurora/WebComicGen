const Stories = require('../models/storyModel')
const User = require('../models/userModel')
require('dotenv').config()

const getStories = async (req, res) => {
  const { _id } = req.user

  try {
    const stories = await Stories.find({
      $or: [
        { status: 'public' },
        { user_id: _id }
      ]
    }).sort({ createdAt: -1 });

    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: "No Stories found" })
    }

    res.status(200).json({ all_stories: stories });

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getStory = async (req, res) => {
  const _id = req.params.id

  try {
    const story = await Stories.findById(_id);

    if (!story) {
      return res.status(404).json({ message: "Story not Found" });
    }

    res.status(200).json({ story });

  } catch (error) {
    res.json(500).json({ error: error.message })
  }
}

const deleteStory = async (req,res) => {
  const _id = req.params.id

  try {
    const response = await Stories.findByIdAndDelete(_id);

    if(!response){
      res.status(500).json({error:"Error Deleting Story"})
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

const createStory = async (req, res) => {
  console.log(req.body);
  const { description } = req.body;
  console.log(description);
  const { _id } = req.user

  try {
    const story = await generateStory(description);
    console.log(story);
    const title = await generateTitle(story);
    const imagePrompts = await generateImagePrompts(story);
    console.log(imagePrompts);
    let fetchedImages = [];

    if (imagePrompts) {

      // Asynchronous image fetching using Promise.all
      const imagePromises = imagePrompts.map(prompt => fetchImage(prompt));
      const statusUrl = await Promise.all(imagePromises);

      const imagesPromises = statusUrl.map(url => get_image_from_url(url))
      const validImages = await Promise.all(imagesPromises);
      const images2DArray = validImages.filter(imgUrl => imgUrl !== null);
      
      const images = [].concat(...images2DArray);

      // Handle potential image fetching errors within the loop
      fetchedImages = images.filter(image => image); // Remove failed fetches
      if (fetchedImages.length !== imagePrompts.length) {
        console.warn("Failed to fetch some images.");
      }
    }

    const storyDocument = await Stories.create({
      title,
      story,
      images: fetchedImages,
      user_id: _id,
      upvotes:0,
      downvotes:0,
      status:"private",
      upvotes:[],
      downvotes:[]
    });

    if (!storyDocument) {
      return res.status(400).json({ error: "Database Error Generating Story" });
    }

    return res.status(200).json(storyDocument);
  } catch (error) {
    console.error("Error creating story:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const answerQuestion = async (req, res) => {
  console.log("answering Question");
  const { _id, question } = req.body;
  console.log(question);

  try {
    const storyDocument = await Stories.findById(_id);

    if (!storyDocument) {
      return res.status(400).json({ error: "Error while answering question." })
    }

    const { story } = storyDocument;

    const questionPrompt = `Answer the question with respect to the story. The response should start with the answer. If the question is not related to answer do not respond. Story is: ${story} . Question is: ${question}`
    const prompt = {
      contents: [
        {
          parts: [
            {
              text: questionPrompt
            }
          ]
        }
      ]
    };

    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prompt)
    })

    const response = await result.json()
    

    if (!response || !response.candidates || !response.candidates[0].content || !response.candidates[0].content.parts) {
      return res.status(400).json({ error: "Error in generating answer" })
    }

    const extractedText = response.candidates[0].content.parts[0].text;

    const formattedText = extractedText.trim().toLowerCase();
    console.log(formattedText);

    const audioUri = await getAudio(formattedText);

    res.status(200).json({ answer: audioUri });

  } catch (error) {
    res.status(200).json({ error: error.message })
  }
}

const handleUpvote = async (req,res) => {
  const { _id } = req.user
  const storyId  = req.params.storyId
  console.log("id",storyId);
  
  try {
    const story = await Stories.findById(storyId);
    const user = await User.findById(_id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if(!story.upvotes.includes(_id)){
      story.upvotes.push(_id);
      user.upvotedPosts.push(storyId);

      // Remove any Downvotes if exsists.
      story.downvotes.pull(_id);
      user.downvotedPosts.pull(storyId);

      await story.save();
      await user.save();
    }
    else{
      story.upvotes.pull(_id);
      user.upvotedPosts.pull(storyId);

      await story.save();
      await user.save();
    }

    res.status(200).json({story})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message})
  }
}

const handleDownvote = async (req,res) => {
  const { _id } = req.user
  const storyId  = req.params.storyId

  try {
    const story = await Stories.findById(storyId);
    const user = await User.findById(_id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if(!story.downvotes.includes(_id)){
      story.downvotes.push(_id);
      user.downvotedPosts.push(storyId);

      // Remove any Downvotes if exsists.
      story.upvotes.pull(_id);
      user.upvotedPosts.pull(storyId);

      await story.save();
      await user.save();
    }
    else{
      story.downvotes.pull(_id);
      user.downvotedPosts.pull(storyId);

      await story.save();
      await user.save();
    }
    res.status(200).json({story})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message})
  }
}

const handleStatusChange = async (req,res) => {
  const storyId = req.params.storyId;
  const status = req.body.status;

  try {
    const story = await Stories.findById(storyId);
    if(!story){
      return res.status(500).json({error:"Story Not Found"})
    }

    story.status = status;
    await story.save();
    res.status(200).json({story})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

const getAudio = async (text) => {
    const body = {
      "Text": text,
      "VoiceId": "Scarlett",
      "Bitrate": "192k",
      "Speed": "0",
      "Pitch": "1",
      "Codec": "libmp3lame",
     " Temperature": 0.25
    }

    try {
      const response = await fetch('https://api.v7.unrealspeech.com/speech',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization" : `Bearer ${process.env.UNREAL_AUDIO}`
        },
        body: JSON.stringify(body)
      })

      const result = await response.json();

      if(!response.ok){
        throw new Error("Error generating answer",response.error)
      }

      return result['OutputUri']


    } catch (error) {
      throw error;
    }
}

const generateStory = async (description) => {
  const childFriendlyPrompt = `Write a story suitable for children aged 6-10. If the content does not fit for children then along with content just respond as Rejected. The story should be about: ${description}`;
  const prompt = {
    contents: [
      {
        parts: [
          {
            text: childFriendlyPrompt
          }
        ]
      }
    ]
  };

  const key = process.env.GEMINI_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`;

  try {
    const story = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    });

    const response = await story.json();

    if (!response || !response.candidates || !response.candidates[0].content || !response.candidates[0].content.parts) {
      // Handle cases where response is empty or lacks content
      throw new Error("Failed to generate story. Please try again later.");
    }

    const extractedText = response.candidates[0].content.parts[0].text;

    const formattedText = extractedText.trim();

    if (formattedText === 'Rejected.') {
      throw new Error("Input Child Friendly Content Only.")
    }

    return formattedText;
  } catch (error) {
    console.log("Error While generating Story", error);
    throw error;
  }
};

const generateImagePrompts = async (story) => {
  const ImagePrompt = `Generate exactly 6 separate and distinct image generation prompts based on the scenes described in the story below. Each prompt should vividly depict what is happening in the scene, using detailed descriptions of the characters and their actions. Avoid using the character names, and instead refer to their species or roles in the scene. Do not number the prompts instead use ++ to seperate 2 prompts: ${story}`;
  const prompt = {
    contents: [
      {
        parts: [
          {
            text: ImagePrompt
          }
        ]
      }
    ]
  };
  const key = process.env.GEMINI_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`;

  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    });

    const response = await result.json();

    if (!response || !response.candidates || !response.candidates[0].content || !response.candidates[0].content.parts) {
      // Handle cases where response is empty or lacks content
      return null;
    }

    const extractedText = response.candidates[0].content.parts[0].text;
    const formattedArray = extractedText.split('++'); // Split by comma followed by two spaces.

    return formattedArray;

  } catch (error) {
    console.log(error);
    return null;
  }
}

const generateTitle = async (story) => {
  const titlePrompt = `Generate a title for the following story. The response should start and only contain the title. ${story}`;
  const prompt = {
    contents: [
      {
        parts: [
          {
            text: titlePrompt
          }
        ]
      }
    ]
  };
  const key = process.env.GEMINI_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`;

  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    });

    const response = await result.json();

    if (!response || !response.candidates || !response.candidates[0].content || !response.candidates[0].content.parts) {
      // Handle cases where response is empty or lacks content
      return null;
    }

    const extractedText = response.candidates[0].content.parts[0].text;
    const formattedTitle = extractedText.trim();

    return formattedTitle;

  } catch (error) {
    console.log(error);
    return null;
  }
}
const fetchImage = async (prompt) => {
  const MONSTER_API_KEY = process.env.MONSTER_API_KEY;
  const MONSTER_API_URL = 'https://api.monsterapi.ai/v1/generate/sdxl-base';
  
  //Fetch a Image based on prompt
  try {
    const response = await fetch(MONSTER_API_URL, {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${MONSTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: "square",
        guidance_scale: 7.5,
        samples: 1,
        style: "fantasy-art"
      })
    })

    if (!response.ok) {
      console.log("Error generating image");
      throw new Error(response.status)
    }

    const result = await response.json();
    const status_url = result['status_url'];

    return status_url;

  } catch (error) {
    throw error
  }


}

const get_image_from_url = async (url) => {
  const MONSTER_API_KEY = process.env.MONSTER_API_KEY;

  try {
    let img_url = null;
    while (!img_url) {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": 'application/json',
          "Authorization": `Bearer ${MONSTER_API_KEY}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching image from url: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result.status === 'FAILED') {
        console.log(`Image generation failed for URL: ${url}`);
        return null;
      }

      img_url = result['result']['output'];
      console.log("ImageUrl", img_url);

      if (!img_url) {
        console.log("Image not generated yet, waiting for 5 seconds...");
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      }
    }

    return img_url;

  } catch (error) {
    throw error;
  }
}

module.exports = { getStories, getStory, createStory, answerQuestion, deleteStory , handleUpvote,handleDownvote,handleStatusChange}