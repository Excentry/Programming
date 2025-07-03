const IDS_KEY = 'FacebookFeedIds';

function saveStoredIds(ids) {
  localStorage.setItem(IDS_KEY, JSON.stringify(ids));
}

export function generatePostId(userName, ids) {
  if (!ids[userName]) {
    ids[userName] = 1;
  } else {
    ids[userName] += 1;
  }

  saveStoredIds(ids);

  return `${userName}-post-${ids[userName]}`;
}
