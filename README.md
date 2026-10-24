# 만델라 효과 · 한국어 퀴즈 (8문항)

이미지 16장 모두 포함되었습니다. 각 정답은 사용자가 제공한 쌍의 첫 번째 이미지입니다. 공식성 판단은 제공자의 지정에 따르며 본 프로젝트에서 브랜드 측의 공식 확인을 수행한 것은 아닙니다.

매 문항의 A/B 위치는 새 시도마다 무작위로 배치됩니다. 이미지들은 1200 × 900 흰색 바탕으로 맞췄고, 5번 Ford의 오답 이미지는 정답의 파란색에 가깝게 보정했습니다. 원래 없던 세부 정보를 생성하는 방식의 복원은 적용하지 않았습니다.

## 중요한 안내

현재 서버 연결은 미설정 상태입니다. `config.js`의 `supabaseUrl`, `supabaseAnonKey`를 실제 Supabase 프로젝트 정보로 바꾸고 `schema.sql`을 실행해야 여러 참가자의 답변을 수집할 수 있습니다. 설정 전 답변은 참가자 본인의 브라우저에만 저장됩니다.

## Supabase 연동
1. https://supabase.com 에서 무료 프로젝트를 만듭니다.
2. SQL Editor에서 `schema.sql`을 실행합니다.
3. Authentication → Users에서 관리자 계정을 추가합니다. 해당 사용자의 UUID로 `insert into public.admin_users (user_id) values ('YOUR_UUID');`를 실행합니다.
4. `config.js`에 Project URL과 publishable/anon key를 붙여 넣습니다. **secret/service_role 키는 절대 입력하지 마세요.**
5. GitHub 저장소 루트에 프로젝트 파일들을 업로드하고 Settings → Pages → Deploy from a branch → main /root를 지정합니다.

통계: 문항별 정답률, 평균 자신감(1~5), 평균 친숙도(1~5), 참가자 수, CSV 내려받기. 개인정보 수집 고지 및 필요한 경우 연구윤리 검토는 주최자가 진행해야 합니다.
