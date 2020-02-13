# WebVisualization
Member: 
Matthew Orubina 
Data Chosen: 
Nobel Laureates (nobel_laureates.csv) 
List of Analytical Tasks: 
My project supports details on demand and filtering the data based on different attributes. In a way, my visualization also supports sorting (based on the different categories). In addition, the bulk of my visualization is based on clustering the data. 
Design Overview: 
I decided to use the Nobel Laureates dataset in my design because I was interested in evaluating the demographics of the different Nobel Peace Prize recipients over the years. My objective was to create an interactive visualization that would show the user how the recipients are represented when placed into different categories. To do this we utilized a bubble graph because of its ability to use positioning, proportions, and color to convey relationships, which is effective for hypervariate data. My visualization can effectively answer analytical questions about the proportions of winners in certain categories. Men are awarded far more than women, for example, in every single category, even literature, though literature does have the most women awarded. In addition, categories like literature have far more dead awardees than others. These trends can lead users to ask questions about why certain things are: is the reason about half of the female awardees are still alive because they only recently started giving women awards? Why are so many people awarded the prize in their old age? What circumstances lead to younger recipients? 
When the user first encounters the graph, they’re presented with various bubbles in red and green to represent each of the Nobel Prize winners, where red represents the recipients who have died and green represents the recipients that are still living. The user is also given the ability to select checkboxes to filter the data based on gender, category, and age. The gender checkbox separates the female and male recipients into horizontal groups. The category checkbox separates the recipients vertically into six Nobel prize classifications consisting of Chemistry, Economics, Physics, Literature, Psychology, and Medicine that are based on the specific Nobel Peace Prize they received. The user is also given the ability to activate multiple checkboxes simultaneously to help them interpret and better assess the relationship between gender and the five classifications. The age checkbox changes the proportions of the circles, where the size of the circle increases depending on the age the recipient received the award. Finally, I included 
tooltips so that the user can get specific information on a given recipient once they hover over a bubble on the graph. 
Screenshots: Full: 
   
Start: 
 
Tooltip: 
Explanations: 
My project does need to be zoomed out to use (in Chrome, I generally zoomed out to 67%) because of how large the circles are. I did try to shrink the circles to prevent this, but then the smallest circles became too small to see, and increasing their size made them too hard to identify compared to the other circles. In addition, the size issue makes my canvas very large to account for the vertical spread of the categories. 

