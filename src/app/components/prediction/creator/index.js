class Creator {
	constructor($log, $mdDialog, userSvc, baseSvc, $rootScope, preSvc, preCSvc) {
		'ngInject';

		this._ = {$log, $mdDialog, userSvc, baseSvc, $rootScope, preSvc, preCSvc};
		this.seasons = preSvc.getSeasons();
		this.weeks = preSvc.getWeeks();
		this.teams = preSvc.getTeams();
		this.teamOrgs = preSvc.getTeamsOrg();
		this.entity = {
			season: this.seasons[0],
			week: this.weeks[0],
			time: '7:30p',
			dateOrg: new Date(2012, 8, 5),
			timeOrg: new Date(2012, 8, 5, 7, 30),
			team: this.teams[20],
			oppTeam: this.teams[18],
			points: 24,
			oppPoints: 17,
			pointsDiff: 7,
			spread: 3.5,
			winAgainstSpread: 1,
			spreadPerSbr: 40,
			moneyTeam: 172,
			moneyOpp: -187,
			totalTeam: 45.5,
			totalOpp: 45.5,
			pickPlay: 39418,
			spreadPerPlay: 41,
			spreadPerVega: 29
		};
	}

	cancel() {
		this._.$mdDialog.cancel();
	}

	create() {
		this._.$log.log('entity->', this.entity);
		this.cancel();
		const entity = {
			game_id: null,
			season: this.entity.season,
			week: this.entity.week,
			date: this.changeDate(this.entity.dateOrg),
			time: this.changeTime(this.entity.timeOrg),
			team_org: this.teamOrgs[this.teams.indexOf(this.entity.team)],
			opponent_team_org: this.teamOrgs[this.teams.indexOf(this.entity.oppTeam)],
			team: this.entity.team,
			opponent_team: this.entity.oppTeam,
			points: this.entity.points,
			opponent_points: this.entity.oppPoints,
			points_difference: this.entity.pointsDiff,
			spread: this.entity.spread,
			win_against_spread: this.entity.winAgainstSpread,
			spread_percentage_sbr: this.entity.spreadPerSbr,
			moneyline_team: this.entity.moneyTeam,
			moneyline_opponent: this.entity.moneyOpp,
			total_team: this.entity.totalTeam,
			total_opponent: this.entity.totalOpp,
			pick_sportsplays: this.entity.pickPlay,
			spread_percentage_sportsplays: this.entity.spreadPerPlay,
			spread_percentage_vegas: this.entity.spreadPerVegas
		};

		const vm = this;
		this._.preCSvc.create(entity);
	}

	changeDate(date) {
		let dd = date.getDate();
		let mm = date.getMonth() + 1; //  January is 0
		const yyyy = date.getFullYear();
		dd = dd < 10 ? `0${dd}` : dd;
		mm = mm < 10 ? `0${mm}` : mm;
		const newdate = `${yyyy}${mm}${dd}`;

		return newdate;
	}

	changeTime(time) {
		let hours = time.getHours();
		let minutes = time.getMinutes();
		var ampm = hours >= 12 ? `p` : `a`;
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		const strTime = `${hours}:${minutes}${ampm}`;
		return strTime;
	}
}

export default Creator;