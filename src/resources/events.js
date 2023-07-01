const events = [
	{
		'title': 'Mendan slide',
		'description' : 'You must prepare slide properly mendan for tomorrow presentation. There will be about 20 guests in attendance so it is also necessary to prepare all the documents',
		'start': new Date(2023, 5, 6, 14, 0, 0),
		'end': new Date(2023, 5, 6, 15, 0, 0),
		'priority': 'critical',
		type:'personal'
	  },
	  {
		'title': 'Document softskill team',
		'description' : '2 weeks from now, the soft skills team will have a presentation so prepare documents for others to make slides',
		'start': new Date(2023, 5, 4, 19, 0 ,0),
		'end': new Date(2023, 5, 4, 21, 30, 0),
		'priority': 'high',
		type:'personal'
	  },
	  {
		'title': 'Practice presenting',
		'description' : 'Tomorrow presentation is very important so let us spend a lot of time practicing the presentation without looking at the script',
		'start': new Date(2023, 5, 5, 19, 0,0),
		'end': new Date(2023, 5, 5, 21, 30, 0),
		'priority': 'low',
		type:'personal'
	  },
	  {
		'title': 'Japanese shadowing',
		'description' : 'practice shawing video that the teacher introduced',
		'start': new Date(2023, 5, 7, 8, 5,0),
		'end': new Date(2023, 5, 7, 12, 30, 0),
		'priority': 'low',
		type:'personal'
	  },
	  {
		'title': 'ITSS coding',
		'description' : 'Interface design for ITSS time attendance application',
		'start': new Date(2023, 5, 24, 13, 5,0),
		'end': new Date(2023, 5, 26, 16, 30, 0),
		'priority': 'high',
		type:'personal'
	  },
	  {
		'title': 'UI/UX review',
		'description' : 'Conduct a review of the other group ui/ux prototypes according to the teacher checklist',
		'start': new Date(2023, 5, 8, 8, 5,0),
		'end': new Date(2023, 5, 8, 12, 30, 0),
		'priority': 'high',
		type:'personal'
	  },
	  {
		'title': 'Azure practice',
		'description' : 'Practice azure according to practice videos on udemy',
		'start': new Date(2023, 5, 8, 12, 40,0),
		'end': new Date(2023, 5, 8, 16, 30, 0),
		'priority': 'critical',
		type:'personal'
	  },
	  {
		'title': 'SoftSkill presenting',
		'description' : 'Online presentation on soft skills',
		'start': new Date(2023, 5, 8, 19, 30,0),
		'end': new Date(2023, 5, 8, 21, 0, 0),
		'priority': 'highest',
		type:'personal'
	  },
	  {
		'title': 'SoftSkill presenting',
		'description' : 'Online presentation on soft skills',
		'start': new Date(2023, 5, 8, 21, 30,0),
		'end': new Date(2023, 5, 8, 22, 0, 0),
		'priority': 'highest',
		type:'personal'
	  },
	  {
		'title': 'Reading book',
		'description' : 'Search for books on getting rich on Ta Quang Buu library to read',
		'start': new Date(2023, 5, 9, 8, 5,0),
		'end': new Date(2023, 5, 9, 12, 30, 0),
		'priority': 'low',
		type:'personal'
	  },
	  {
		'title': 'GR1 coding',
		'description' : 'Continue to complete the necessary stages in Gr1 for the booking application',
		'start': new Date(2023, 5, 9, 14, 5,0),
		'end': new Date(2023, 5, 9, 17, 30, 0),
		'priority': 'high',
		type:'personal'
	  },
	  {
		'title': 'Cloud learning',
		'description' : 'Starting learning cloud',
		'start': new Date(2023, 5, 27, 8, 20,0),
		'end': new Date(2023, 5, 28, 18, 30, 0),
		'priority': 'low',
		type:'personal'
	  },
	  {
		'title': 'Japanese learning',
		'description' : 'Practice vocabulary and read JLPT N1 to prepare for the upcoming exam',
		'start': new Date(2023, 5, 28, 19, 20,0),
		'end': new Date(2023, 5, 29, 22, 30, 0),
		'priority': 'low',
		type:'personal'
	  },
	  {
		'title': 'Japanese learning',
		'description' : 'Practice vocabulary and read JLPT N1 to prepare for the upcoming exam',
		'start': new Date(2023, 5, 28, 8, 20,0),
		'end': new Date(2023, 5, 30, 10, 30, 0),
		'priority': 'low',
		type:'personal'
	  },
	  {
		'title': 'Optimizing Utils I18n',
		'description' : 'In i18n there are some regex that not optimized. Optimize them to Util work more efficent!',
		'start': new Date(2023, 5, 29, 12, 40,0),
		'end': new Date(2023, 5, 30, 15, 30, 0),
		'priority': 'low',
		type:'collaborative',
		teamName: 'advertisement-management',
	  },
	  {
		'title': 'Fix bug in UI-kit',
		'description' : 'The color picker in Ui-kit is not showing properly. It show old value instead of new value. Please fix it. ',
		'start': new Date(2023, 5, 30, 17, 40,0),
		'end': new Date(2023, 5, 30, 20, 30, 0),
		'priority': 'critical',
		type:'collaborative',
		teamName: 'ui-kit',
	  },
	  {
		'title': 'Improve I18n translator',
		'description' : 'Translator in I18n works well but some function is not optimized. Please help me improve it ',
		'start': new Date(2023, 6, 1, 17, 40,0),
		'end': new Date(2023, 6, 3, 19, 30, 0),
		'priority': 'critical',
		type:'collaborative',
		teamName: 'advertisement-management',
	  },
	  {
		'title': 'Learn N1 moji goi',
		'description' : 'JLPT exam is coming, go hard !! ',
		'start': new Date(2023, 6, 1, 8, 40,0),
		'end': new Date(2023, 6, 5, 10, 30, 0),
		'priority': 'low',
		type:'personal',
		teamName: 'advertisement-management',
	  },
	  {
		'title': 'Fix bug in UI-kit',
		'description' : 'The color picker in Ui-kit is not showing properly. It show old value instead of new value. Please fix it. ',
		'start': new Date(2023, 6, 2, 17, 40,0),
		'end': new Date(2023, 6, 5, 20, 30, 0),
		'priority': 'critical',
		type:'collaborative',
	  },
	  {
		'title': 'Improve I18n translator',
		'description' : 'Translator in I18n works well but some function is not optimized. Please help me improve it ',
		'start': new Date(2023, 6, 4, 17, 40,0),
		'end': new Date(2023, 6, 5, 19, 30, 0),
		'priority': 'critical',
		type:'collaborative',
	  },
	  {
		'title': 'Optimizing Utils I18n',
		'description' : 'In i18n there are some regex that not optimized. Optimize them to Util work more efficent!',
		'start': new Date(2023,6, 29, 12, 40,0),
		'end': new Date(2023, 7, 30, 15, 30, 0),
		'priority': 'low',
		type:'collaborative'
	  },

]

export default events;
