# FishfryToursApp
Example app for IS24 DevOps Container Platform position

<h2>Back-End and Schema</h2>
There are two types of entities used by the project, Boats and Guides. 
<h3>Boats</h3>
The Boat Model contains the following fields
<ul>
<li><strong>Id:</strong> The boat's unique key. This is created automatically when the boat is committed to the DV, and is returned to the front-end</li> 
<li><strong>Name:</strong> The boat's displayed name. This can be set by the user when creating a boat in the front-end</li>
<li><strong>Status:</strong> The boat's swimlane status, docked, outbound, inbound or maintenance</li>
</ul>

<h3>Guides</h3>
The Guide Model contains the following fields
<ul>
<li><strong>Id:</strong> The guides's unique key. This is created automatically when the boat is committed to the DV</li> 
<li><strong>Name:</strong> The guides's displayed name.</li>
<li><strong>AssignedBoatId:</strong> The ID of the boat this guide is assigned to. If the guide is assigned to a boat existing in the database, the guide will show up on the boat's card in the front-end</li>
</ul>
<strong>At the time of creating this initial README, the front-end UI has no way of adding or modifying guides.</strong> I used Postman to access API calls to add and modify guides.
<br/>In the real world, we would want to capture far more information with these models, such as contact information and emergency contacts for guides, or a list of intended destinations for the boats, but for the sake of time I considered these to be out of scope.
<p><strong>The entities used by my project are pulled from a SQL Database cloud hosted on Azure.</strong></P>
<h2>API</h2>
The back-end supports the following API calls, which are defined in BoatsController.cs
<h3>Boats</h3>
<ul>
<li><strong>GetBoats</strong> returns a JSON string defining all boats in DB</li>
<li><strong>CreateBoat</strong> Binds "Name" and "Status". Creates a new boat, and saves it to the DB, where its ID is assigned. Returns the ID of the newly saved boat</li>
<li><strong>DeleteBoat</strong> Takes a boat's ID as a parameter, and deletes the boat from the DB</li>
<li><strong>UpdateBoat</strong> Takes a boat's ID and its new status as parameters. A boat's status is used to determine its Kanban swimlane in the front-end</li>
</ul>

<h3>Guides</h3>
<ul>
<li><strong>GetGuides</strong> returns a JSON string defining all guides in DB</li>
<li><strong>CreateGuide</strong> Binds "Name" and "AssignedBoatId". Creates a new guide, and saves it to the DB, where its ID is assigned. Returns the ID of the newly saved guide</li>
<li><strong>DeleteGuide</strong> Takes a guide's ID as a parameter, and deletes the boat from the DB</li>
<li><strong>UpdateGuide</strong> Takes a guides's ID and its new AssignedBoatId as parameters. A Guide's AssignedBoatID is used to determine which boat card it will appear on in the Kanban swimlane in the front-end</li>
</ul>

<h2>Front-End</h2>
<p>The project is hosted on Azure, and can be found at https://fishfrytours.azurewebsites.net/</p>
<p>The front-end consists of a Kanban board showing boats' statuses ("docked", "outbound", "inbound", and "maintenance") as swimlanes. Dragging boats between swimlanes updates their
status in the DB. A panel for creating a new boat by entering its name and clicking "add" can be seen at the top, as well as a delete drop area. Dragging a boat onto the delete drop area
will launch a confirmation dialog allowing the user to delete the boat, or cancel. Deleting a boat removes it from the Database.</p>
<p>At the time of writing this README, the front-end has a few short comings that I think are important to address, as they are contrary to the use context supplied with the assignment:</p>
<h4>Touching to drag and drop boat cards does not work on mobile devices</h4>
This is unfortunate as users on mobile phones are explicitly mentioned. I see there are NPM packages to implement touch dragging, so this is a solvable problem, 
but I'm reluctant to spend more time than I already have on the front-end at the expense of the QA portion
<h4>As of yet, there is no way to Create, delete or update guides with the UI</h4>
While this may not be all that useful for users out on boats, it would certainly be an asset to office staff.
I've been doing all my work with guides through API calls through postman. 

<h2>QA</h2>
<p>Unit testing has been implemented by a .Net Core xUnit test project, included in this repo. It uses Moq to create an in-memory dataset to work from, and allows calls to be made to BoatsController.cs using this dataset. </p>
<p>Endpoints tested through these unit tests include GetBoats, CreateBoat, UpdateBoat, DeleteBoat, UpdateGuide and CreateGuide, which represents wide coverage of the back-end API calls. </p>
<p>As per assessment instructions, I've included a paragraph about testing in "ApproachToTesting.pdf", included in the root of this repo.</p>


<h2>DevOps Pipeline</h2>
A continuous deployment pipeline using Github Actions between this Git repository and the Azure App services is established. When commits are pushed to the remote repository from Git, they are automatically published
to Azure. I followed this tutorial: https://docs.microsoft.com/en-us/azure/app-service/deploy-continuous-deployment?tabs=github
<p>Note that deploying through GitHub Actions includes build error messaging.</p>
