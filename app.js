// Application Data
let appData = {
  teamMembers: [
    {"id": 1, "name": "Alice Johnson", "role": "Product Owner", "avatar": "AJ"},
    {"id": 2, "name": "Bob Smith", "role": "Developer", "avatar": "BS"},
    {"id": 3, "name": "Carol Davis", "role": "Designer", "avatar": "CD"},
    {"id": 4, "name": "David Wilson", "role": "Developer", "avatar": "DW"},
    {"id": 5, "name": "Eva Martinez", "role": "Scrum Master", "avatar": "EM"}
  ],
  userStories: [
    {
      "id": 1,
      "title": "User Login Security",
      "description": "As a user, I want to log in securely so that my data is protected",
      "storyPoints": 8,
      "priority": "High",
      "status": "In Progress",
      "assignee": "Bob Smith",
      "acceptanceCriteria": ["Secure password validation", "Session management", "Multi-factor authentication option"]
    },
    {
      "id": 2,
      "title": "Order History View",
      "description": "As a customer, I want to view my order history so that I can track my purchases",
      "storyPoints": 5,
      "priority": "Medium",
      "status": "To Do",
      "assignee": "Carol Davis",
      "acceptanceCriteria": ["Display order list", "Show order details", "Filter by date range"]
    },
    {
      "id": 3,
      "title": "User Account Management",
      "description": "As an admin, I want to manage user accounts so that I can control access",
      "storyPoints": 13,
      "priority": "High",
      "status": "To Do",
      "assignee": "David Wilson",
      "acceptanceCriteria": ["Create/delete users", "Assign roles", "View user activity"]
    },
    {
      "id": 4,
      "title": "Password Reset",
      "description": "As a user, I want to reset my password so that I can regain access to my account",
      "storyPoints": 3,
      "priority": "Low",
      "status": "Done",
      "assignee": "David Wilson",
      "acceptanceCriteria": ["Email verification", "Secure reset link", "Password strength validation"]
    },
    {
      "id": 5,
      "title": "Email Notifications",
      "description": "As a customer, I want to receive email notifications so that I stay informed",
      "storyPoints": 5,
      "priority": "Medium",
      "status": "To Do",
      "assignee": "Bob Smith",
      "acceptanceCriteria": ["Order confirmations", "Shipping updates", "Unsubscribe option"]
    }
  ],
  tasks: [
    {
      "id": 1,
      "title": "Create login form UI",
      "description": "Design and implement the user interface for the login form",
      "assignee": "Carol Davis",
      "storyPoints": 5,
      "status": "In Progress",
      "priority": "High",
      "userStoryId": 1
    },
    {
      "id": 2,
      "title": "Implement authentication API",
      "description": "Create backend API endpoints for user authentication",
      "assignee": "Bob Smith",
      "storyPoints": 8,
      "status": "Done",
      "priority": "High",
      "userStoryId": 1
    },
    {
      "id": 3,
      "title": "Design user dashboard wireframes",
      "description": "Create wireframes for the main user dashboard interface",
      "assignee": "Carol Davis",
      "storyPoints": 3,
      "status": "To Do",
      "priority": "Medium",
      "userStoryId": 2
    },
    {
      "id": 4,
      "title": "Set up database schema",
      "description": "Design and implement the database structure for user accounts",
      "assignee": "David Wilson",
      "storyPoints": 5,
      "status": "Done",
      "priority": "High",
      "userStoryId": 3
    },
    {
      "id": 5,
      "title": "Write unit tests for login",
      "description": "Create comprehensive unit tests for login functionality",
      "assignee": "Bob Smith",
      "storyPoints": 3,
      "status": "To Do",
      "priority": "Medium",
      "userStoryId": 1
    },
    {
      "id": 6,
      "title": "Create password reset functionality",
      "description": "Implement password reset feature with email verification",
      "assignee": "David Wilson",
      "storyPoints": 5,
      "status": "In Progress",
      "priority": "Low",
      "userStoryId": 4
    }
  ],
  currentSprint: {
    "id": 3,
    "name": "User Authentication & Security",
    "startDate": "2025-05-20",
    "endDate": "2025-06-03",
    "goal": "Complete user authentication system and basic security features",
    "capacity": 40,
    "committed": 32
  },
  sprintHistory: [
    {"sprint": 1, "planned": 25, "completed": 23, "velocity": 23},
    {"sprint": 2, "planned": 30, "completed": 28, "velocity": 28},
    {"sprint": 3, "planned": 32, "completed": 15, "velocity": 15}
  ]
};

// Application State
let currentView = 'dashboard';
let currentEditingTask = null;
let currentEditingStory = null;
let draggedTask = null;
let draggedTaskId = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupModals();
  setupFilters();
  renderTeamList();
  renderDashboard();
  renderKanbanBoard();
  renderSprintPlanning();
  renderBacklog();
  renderReports();
  populateFormOptions();
  setupDragAndDropZones();
}

// Navigation
function setupNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const viewName = this.dataset.view;
      switchView(viewName);
      
      // Update active tab
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function switchView(viewName) {
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('active'));
  
  const targetView = document.getElementById(viewName + 'View');
  if (targetView) {
    targetView.classList.add('active');
    currentView = viewName;
    
    // Refresh view-specific content
    switch(viewName) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'kanban':
        renderKanbanBoard();
        break;
      case 'sprint':
        renderSprintPlanning();
        break;
      case 'backlog':
        renderBacklog();
        break;
      case 'reports':
        renderReports();
        break;
    }
  }
}

// Team List
function renderTeamList() {
  const teamList = document.getElementById('teamList');
  teamList.innerHTML = appData.teamMembers.map(member => `
    <div class="team-member">
      <div class="member-avatar">${member.avatar}</div>
      <div class="member-info">
        <div class="member-name">${member.name}</div>
        <div class="member-role">${member.role}</div>
      </div>
    </div>
  `).join('');
}

// Dashboard
function renderDashboard() {
  renderSprintOverview();
  renderMetrics();
  renderRecentActivity();
  renderBurndownChart();
}

function renderSprintOverview() {
  const sprint = appData.currentSprint;
  const completedPoints = calculateCompletedPoints();
  const progressPercentage = (completedPoints / sprint.committed) * 100;
  
  document.getElementById('sprintName').textContent = `Sprint ${sprint.id}: ${sprint.name}`;
  document.getElementById('sprintGoal').textContent = sprint.goal;
  document.getElementById('sprintProgress').style.width = `${progressPercentage}%`;
  document.querySelector('.progress-text').textContent = `${completedPoints}/${sprint.committed} Story Points`;
}

function renderMetrics() {
  const velocity = calculateAverageVelocity();
  const completedTasks = appData.tasks.filter(task => task.status === 'Done').length;
  const remainingTasks = appData.tasks.filter(task => task.status !== 'Done').length;
  
  const metricValues = document.querySelectorAll('.metric-value');
  const metricTrends = document.querySelectorAll('.metric-trend');
  
  if (metricValues.length >= 3) {
    metricValues[0].textContent = velocity.toFixed(1);
    metricValues[2].textContent = completedTasks;
  }
  
  if (metricTrends.length >= 3) {
    metricTrends[2].textContent = `${remainingTasks} remaining`;
  }
}

function renderRecentActivity() {
  const activityList = document.getElementById('activityList');
  const activities = [
    { user: 'CD', text: 'Carol moved "Create login form UI" to In Progress', time: '2 hours ago' },
    { user: 'BS', text: 'Bob completed "Implement authentication API"', time: '5 hours ago' },
    { user: 'DW', text: 'David started "Password reset functionality"', time: '1 day ago' },
    { user: 'EM', text: 'Eva updated sprint goal', time: '2 days ago' }
  ];
  
  activityList.innerHTML = activities.map(activity => `
    <div class="activity-item">
      <div class="activity-avatar">${activity.user}</div>
      <div class="activity-content">
        <div class="activity-text">${activity.text}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    </div>
  `).join('');
}

// Kanban Board
function renderKanbanBoard() {
  const columns = ['To Do', 'In Progress', 'Done'];
  
  columns.forEach(status => {
    const columnId = status.replace(/\s+/g, '').toLowerCase() + 'Column';
    const countId = status.replace(/\s+/g, '').toLowerCase() + 'Count';
    const column = document.getElementById(columnId);
    const countElement = document.getElementById(countId);
    const tasks = getFilteredTasks().filter(task => task.status === status);
    
    if (column) {
      column.innerHTML = tasks.map(task => createTaskCard(task)).join('');
      setupTaskCardEvents(column);
    }
    
    if (countElement) {
      countElement.textContent = tasks.length;
    }
  });
  
  // Re-setup drag and drop after rendering
  setupDragAndDropZones();
}

function createTaskCard(task) {
  const assignee = appData.teamMembers.find(member => member.name === task.assignee);
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  
  return `
    <div class="task-card ${priorityClass}" draggable="true" data-task-id="${task.id}">
      <div class="task-title">${task.title}</div>
      <div class="task-meta">
        <div class="task-assignee">
          <div class="task-avatar">${assignee ? assignee.avatar : '?'}</div>
          <span>${task.assignee}</span>
        </div>
        <div class="task-points">${task.storyPoints}</div>
      </div>
    </div>
  `;
}

function setupTaskCardEvents(container) {
  const taskCards = container.querySelectorAll('.task-card');
  taskCards.forEach(card => {
    // Setup click to edit
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const taskId = parseInt(this.dataset.taskId);
      editTask(taskId);
    });
  });
}

function getFilteredTasks() {
  let tasks = [...appData.tasks];
  
  const assigneeFilter = document.getElementById('assigneeFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  
  if (assigneeFilter && assigneeFilter.value) {
    tasks = tasks.filter(task => task.assignee === assigneeFilter.value);
  }
  
  if (priorityFilter && priorityFilter.value) {
    tasks = tasks.filter(task => task.priority === priorityFilter.value);
  }
  
  return tasks;
}

// Drag and Drop - Fixed Implementation
function setupDragAndDropZones() {
  // Setup drag events for task cards
  document.addEventListener('dragstart', function(e) {
    if (e.target.classList.contains('task-card')) {
      draggedTaskId = parseInt(e.target.dataset.taskId);
      draggedTask = e.target;
      e.target.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggedTaskId);
    }
  });

  document.addEventListener('dragend', function(e) {
    if (e.target.classList.contains('task-card')) {
      e.target.classList.remove('dragging');
      draggedTask = null;
      draggedTaskId = null;
      
      // Remove drag-over class from all columns
      document.querySelectorAll('.column-content').forEach(col => {
        col.classList.remove('drag-over');
      });
    }
  });

  // Setup drop zones for columns
  const columns = document.querySelectorAll('.column-content');
  columns.forEach(column => {
    column.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      this.classList.add('drag-over');
    });

    column.addEventListener('dragleave', function(e) {
      // Only remove drag-over if we're actually leaving the column content area
      if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
      }
    });

    column.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('drag-over');
      
      if (draggedTaskId) {
        const newStatus = this.closest('.kanban-column').dataset.status;
        updateTaskStatus(draggedTaskId, newStatus);
        renderKanbanBoard();
        renderDashboard(); // Update dashboard metrics
      }
    });
  });
}

function updateTaskStatus(taskId, newStatus) {
  const task = appData.tasks.find(t => t.id === taskId);
  if (task && task.status !== newStatus) {
    task.status = newStatus;
    console.log(`Task ${taskId} moved to ${newStatus}`); // Debug log
  }
}

// Sprint Planning
function renderSprintPlanning() {
  renderSprintDetails();
  renderSprintBacklog();
}

function renderSprintDetails() {
  const sprint = appData.currentSprint;
  const sprintDetails = document.getElementById('sprintDetails');
  
  sprintDetails.innerHTML = `
    <div class="sprint-detail-item">
      <span class="sprint-detail-label">Sprint Name</span>
      <span class="sprint-detail-value">${sprint.name}</span>
    </div>
    <div class="sprint-detail-item">
      <span class="sprint-detail-label">Start Date</span>
      <span class="sprint-detail-value">${formatDate(sprint.startDate)}</span>
    </div>
    <div class="sprint-detail-item">
      <span class="sprint-detail-label">End Date</span>
      <span class="sprint-detail-value">${formatDate(sprint.endDate)}</span>
    </div>
    <div class="sprint-detail-item">
      <span class="sprint-detail-label">Capacity</span>
      <span class="sprint-detail-value">${sprint.capacity}h</span>
    </div>
    <div class="sprint-detail-item">
      <span class="sprint-detail-label">Committed</span>
      <span class="sprint-detail-value">${sprint.committed} points</span>
    </div>
    <div class="sprint-detail-item">
      <span class="sprint-detail-label">Goal</span>
      <span class="sprint-detail-value">${sprint.goal}</span>
    </div>
  `;
}

function renderSprintBacklog() {
  const sprintBacklog = document.getElementById('sprintBacklogList');
  const sprintStories = appData.userStories.filter(story => 
    ['In Progress', 'Done'].includes(story.status) || 
    appData.tasks.some(task => task.userStoryId === story.id)
  );
  
  sprintBacklog.innerHTML = sprintStories.map(story => `
    <div class="story-item" data-story-id="${story.id}">
      <div class="story-header">
        <h4 class="story-title">${story.title}</h4>
        <div class="story-meta">
          <span class="story-points">${story.storyPoints}</span>
          <span class="story-priority ${story.priority.toLowerCase()}">${story.priority}</span>
          <span class="status status--${getStatusClass(story.status)}">${story.status}</span>
        </div>
      </div>
      <p class="story-description">${story.description}</p>
      <div class="story-assignee">
        <span>Assigned to: ${story.assignee}</span>
      </div>
    </div>
  `).join('');
  
  // Add click events for story items
  sprintBacklog.querySelectorAll('.story-item').forEach(item => {
    item.addEventListener('click', function() {
      const storyId = parseInt(this.dataset.storyId);
      editStory(storyId);
    });
  });
}

// Backlog
function renderBacklog() {
  const backlogList = document.getElementById('backlogList');
  
  backlogList.innerHTML = appData.userStories.map(story => `
    <div class="story-item" data-story-id="${story.id}">
      <div class="story-header">
        <h4 class="story-title">${story.title}</h4>
        <div class="story-meta">
          <span class="story-points">${story.storyPoints}</span>
          <span class="story-priority ${story.priority.toLowerCase()}">${story.priority}</span>
          <span class="status status--${getStatusClass(story.status)}">${story.status}</span>
        </div>
      </div>
      <p class="story-description">${story.description}</p>
      <div class="story-assignee">
        <span>Assigned to: ${story.assignee}</span>
      </div>
    </div>
  `).join('');
  
  // Add click events for story items
  backlogList.querySelectorAll('.story-item').forEach(item => {
    item.addEventListener('click', function() {
      const storyId = parseInt(this.dataset.storyId);
      editStory(storyId);
    });
  });
}

// Reports
function renderReports() {
  renderVelocityChart();
  renderDistributionChart();
  renderTeamPerformance();
}

function renderVelocityChart() {
  const canvas = document.getElementById('velocityChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const data = appData.sprintHistory;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Chart dimensions
  const padding = 40;
  const chartWidth = canvas.width - (padding * 2);
  const chartHeight = canvas.height - (padding * 2);
  const maxValue = Math.max(...data.map(d => Math.max(d.planned, d.completed)));
  const barWidth = chartWidth / (data.length * 2);
  
  // Draw bars
  data.forEach((sprint, index) => {
    const x = padding + (index * barWidth * 2);
    const plannedHeight = (sprint.planned / maxValue) * chartHeight;
    const completedHeight = (sprint.completed / maxValue) * chartHeight;
    
    // Planned bar (light blue)
    ctx.fillStyle = '#93C5FD';
    ctx.fillRect(x, padding + chartHeight - plannedHeight, barWidth * 0.8, plannedHeight);
    
    // Completed bar (dark blue)
    ctx.fillStyle = '#2563EB';
    ctx.fillRect(x + barWidth, padding + chartHeight - completedHeight, barWidth * 0.8, completedHeight);
    
    // Sprint label
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Sprint ${sprint.sprint}`, x + barWidth, canvas.height - 10);
  });
  
  // Legend
  ctx.fillStyle = '#93C5FD';
  ctx.fillRect(padding, 10, 15, 15);
  ctx.fillStyle = '#374151';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Planned', padding + 20, 22);
  
  ctx.fillStyle = '#2563EB';
  ctx.fillRect(padding + 80, 10, 15, 15);
  ctx.fillText('Completed', padding + 100, 22);
}

function renderDistributionChart() {
  const canvas = document.getElementById('distributionChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  const statusCounts = {
    'To Do': appData.tasks.filter(t => t.status === 'To Do').length,
    'In Progress': appData.tasks.filter(t => t.status === 'In Progress').length,
    'Done': appData.tasks.filter(t => t.status === 'Done').length
  };
  
  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
  if (total === 0) return;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  
  const colors = ['#EF4444', '#F59E0B', '#10B981'];
  let currentAngle = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  Object.values(statusCounts).forEach((count, index) => {
    const sliceAngle = (count / total) * 2 * Math.PI;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = colors[index];
    ctx.fill();
    
    currentAngle += sliceAngle;
  });
  
  // Legend
  const labels = Object.keys(statusCounts);
  labels.forEach((label, index) => {
    ctx.fillStyle = colors[index];
    ctx.fillRect(10, 10 + (index * 25), 15, 15);
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${label}: ${statusCounts[label]}`, 30, 22 + (index * 25));
  });
}

function renderTeamPerformance() {
  const teamPerformance = document.getElementById('teamPerformance');
  
  const memberStats = appData.teamMembers.map(member => {
    const memberTasks = appData.tasks.filter(task => task.assignee === member.name);
    const completed = memberTasks.filter(task => task.status === 'Done').length;
    const inProgress = memberTasks.filter(task => task.status === 'In Progress').length;
    const total = memberTasks.length;
    
    return {
      member,
      completed,
      inProgress,
      total
    };
  });
  
  teamPerformance.innerHTML = memberStats.map(stats => `
    <div class="performance-item">
      <div class="performance-member">
        <div class="member-avatar">${stats.member.avatar}</div>
        <div class="member-info">
          <div class="member-name">${stats.member.name}</div>
          <div class="member-role">${stats.member.role}</div>
        </div>
      </div>
      <div class="performance-stats">
        <span>Total: ${stats.total}</span>
        <span>Completed: ${stats.completed}</span>
        <span>In Progress: ${stats.inProgress}</span>
      </div>
    </div>
  `).join('');
}

// Burndown Chart
function renderBurndownChart() {
  const canvas = document.getElementById('burndownChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Sample burndown data
  const idealBurndown = [32, 28, 24, 20, 16, 12, 8, 4, 0];
  const actualBurndown = [32, 30, 26, 24, 20, 18, 15, 15, 15];
  const days = idealBurndown.length;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const padding = 40;
  const chartWidth = canvas.width - (padding * 2);
  const chartHeight = canvas.height - (padding * 2);
  const stepX = chartWidth / (days - 1);
  const maxY = Math.max(...idealBurndown);
  
  // Draw grid lines
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    const y = padding + (i / 8) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(padding + chartWidth, y);
    ctx.stroke();
  }
  
  // Draw ideal line
  ctx.strokeStyle = '#93C5FD';
  ctx.lineWidth = 2;
  ctx.beginPath();
  idealBurndown.forEach((value, index) => {
    const x = padding + (index * stepX);
    const y = padding + chartHeight - ((value / maxY) * chartHeight);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
  
  // Draw actual line
  ctx.strokeStyle = '#2563EB';
  ctx.lineWidth = 3;
  ctx.beginPath();
  actualBurndown.forEach((value, index) => {
    const x = padding + (index * stepX);
    const y = padding + chartHeight - ((value / maxY) * chartHeight);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
  
  // Labels
  ctx.fillStyle = '#374151';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Sprint Progress', canvas.width / 2, canvas.height - 5);
}

// Modal Management
function setupModals() {
  // Task Modal
  const taskModal = document.getElementById('taskModal');
  const storyModal = document.getElementById('storyModal');
  
  // Close modal events
  document.getElementById('closeTaskModal').addEventListener('click', () => closeModal('taskModal'));
  document.getElementById('closeStoryModal').addEventListener('click', () => closeModal('storyModal'));
  document.getElementById('cancelTask').addEventListener('click', () => closeModal('taskModal'));
  document.getElementById('cancelStory').addEventListener('click', () => closeModal('storyModal'));
  
  // Form submissions
  document.getElementById('taskForm').addEventListener('submit', handleTaskSubmit);
  document.getElementById('storyForm').addEventListener('submit', handleStorySubmit);
  
  // Quick action buttons
  document.getElementById('addTaskBtn').addEventListener('click', () => openTaskModal());
  document.getElementById('addStoryBtn').addEventListener('click', () => openStoryModal());
  document.getElementById('addStoryBtnMain').addEventListener('click', () => openStoryModal());
  
  // Add task buttons in kanban columns - using event delegation
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-task-btn')) {
      const status = e.target.dataset.status;
      openTaskModal(null, status);
    }
  });
  
  // Close modals when clicking outside
  [taskModal, storyModal].forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

function openTaskModal(taskId = null, defaultStatus = 'To Do') {
  currentEditingTask = taskId;
  const modal = document.getElementById('taskModal');
  const form = document.getElementById('taskForm');
  const title = document.getElementById('taskModalTitle');
  
  if (taskId) {
    const task = appData.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    title.textContent = 'Edit Task';
    
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description || '';
    document.getElementById('taskAssignee').value = task.assignee;
    document.getElementById('taskStoryPoints').value = task.storyPoints;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskStatus').value = task.status;
  } else {
    title.textContent = 'Add Task';
    form.reset();
    document.getElementById('taskStatus').value = defaultStatus;
    document.getElementById('taskStoryPoints').value = '3';
    document.getElementById('taskPriority').value = 'Medium';
  }
  
  modal.classList.add('active');
}

function openStoryModal(storyId = null) {
  currentEditingStory = storyId;
  const modal = document.getElementById('storyModal');
  const form = document.getElementById('storyForm');
  const title = document.getElementById('storyModalTitle');
  
  if (storyId) {
    const story = appData.userStories.find(s => s.id === storyId);
    if (!story) return;
    
    title.textContent = 'Edit User Story';
    
    document.getElementById('storyTitle').value = story.title;
    document.getElementById('storyDescription').value = story.description;
    document.getElementById('storyStoryPoints').value = story.storyPoints;
    document.getElementById('storyPriority').value = story.priority;
    document.getElementById('storyAssignee').value = story.assignee;
    document.getElementById('storyAcceptanceCriteria').value = story.acceptanceCriteria.join('\n');
  } else {
    title.textContent = 'Add User Story';
    form.reset();
    document.getElementById('storyStoryPoints').value = '5';
    document.getElementById('storyPriority').value = 'Medium';
  }
  
  modal.classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  currentEditingTask = null;
  currentEditingStory = null;
}

function handleTaskSubmit(e) {
  e.preventDefault();
  
  const taskData = {
    title: document.getElementById('taskTitle').value,
    description: document.getElementById('taskDescription').value,
    assignee: document.getElementById('taskAssignee').value,
    storyPoints: parseInt(document.getElementById('taskStoryPoints').value),
    priority: document.getElementById('taskPriority').value,
    status: document.getElementById('taskStatus').value
  };
  
  if (currentEditingTask) {
    const task = appData.tasks.find(t => t.id === currentEditingTask);
    if (task) {
      Object.assign(task, taskData);
    }
  } else {
    const newTask = {
      id: Math.max(...appData.tasks.map(t => t.id)) + 1,
      userStoryId: 1,
      ...taskData
    };
    appData.tasks.push(newTask);
  }
  
  closeModal('taskModal');
  renderKanbanBoard();
  renderDashboard();
}

function handleStorySubmit(e) {
  e.preventDefault();
  
  const storyData = {
    title: document.getElementById('storyTitle').value,
    description: document.getElementById('storyDescription').value,
    storyPoints: parseInt(document.getElementById('storyStoryPoints').value),
    priority: document.getElementById('storyPriority').value,
    assignee: document.getElementById('storyAssignee').value,
    acceptanceCriteria: document.getElementById('storyAcceptanceCriteria').value.split('\n').filter(c => c.trim()),
    status: 'To Do'
  };
  
  if (currentEditingStory) {
    const story = appData.userStories.find(s => s.id === currentEditingStory);
    if (story) {
      Object.assign(story, storyData);
    }
  } else {
    const newStory = {
      id: Math.max(...appData.userStories.map(s => s.id)) + 1,
      ...storyData
    };
    appData.userStories.push(newStory);
  }
  
  closeModal('storyModal');
  renderBacklog();
  renderSprintPlanning();
}

function editTask(taskId) {
  openTaskModal(taskId);
}

function editStory(storyId) {
  openStoryModal(storyId);
}

// Filters
function setupFilters() {
  const assigneeFilter = document.getElementById('assigneeFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  
  if (assigneeFilter) {
    assigneeFilter.addEventListener('change', renderKanbanBoard);
  }
  
  if (priorityFilter) {
    priorityFilter.addEventListener('change', renderKanbanBoard);
  }
}

function populateFormOptions() {
  const assigneeSelects = ['taskAssignee', 'storyAssignee', 'assigneeFilter'];
  
  assigneeSelects.forEach(selectId => {
    const select = document.getElementById(selectId);
    if (select) {
      const currentValue = select.value;
      const options = select.querySelectorAll('option');
      
      // Keep only the first default option
      const defaultOption = options[0];
      select.innerHTML = '';
      if (defaultOption) {
        select.appendChild(defaultOption);
      }
      
      appData.teamMembers.forEach(member => {
        const option = document.createElement('option');
        option.value = member.name;
        option.textContent = member.name;
        select.appendChild(option);
      });
      
      select.value = currentValue;
    }
  });
}

// Utility Functions
function calculateCompletedPoints() {
  return appData.tasks
    .filter(task => task.status === 'Done')
    .reduce((total, task) => total + task.storyPoints, 0);
}

function calculateAverageVelocity() {
  const velocities = appData.sprintHistory.map(sprint => sprint.velocity);
  return velocities.reduce((a, b) => a + b, 0) / velocities.length;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function getStatusClass(status) {
  switch(status) {
    case 'Done': return 'success';
    case 'In Progress': return 'warning';
    case 'To Do': return 'info';
    default: return 'info';
  }
}