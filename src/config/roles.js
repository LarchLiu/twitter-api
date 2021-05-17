const roles = ['guest', 'admin', 'user', 'vip1'];

const roleRights = new Map();
roleRights.set(roles[0], { rights: [], tweepsCount: 5, tweepsType: 'random' });
roleRights.set(roles[1], {
  rights: ['getUsers', 'manageUsers', 'manageTweeps', 'refresh'],
  tweepsCount: -1,
  tweepsType: 'customize',
});
roleRights.set(roles[2], { rights: ['manageTweeps'], tweepsCount: 5, tweepsType: 'customize' });
roleRights.set(roles[3], { rights: ['manageTweeps'], tweepsCount: 50, tweepsType: 'customize' });

module.exports = {
  roles,
  roleRights,
};
