import admin from 'firebase-admin'
import { onCall, HttpsError } from 'firebase-functions/v2/https'

admin.initializeApp()

const hasAdminClaim = (request) => request.auth?.token?.role === 'admin'

const requireAdmin = (request) => {
  if (!hasAdminClaim(request)) {
    throw new HttpsError('permission-denied', 'Admin role is required.')
  }
}

export const createAdminReport = onCall(async (request) => {
  requireAdmin(request)

  const snapshot = await admin.firestore().collection('ratings').get()
  const ratings = snapshot.docs.map((doc) => doc.data())
  const averageScore =
    ratings.length === 0
      ? 0
      : ratings.reduce((sum, rating) => sum + Number(rating.score || 0), 0) / ratings.length

  return {
    ratingCount: ratings.length,
    averageScore: Number(averageScore.toFixed(2)),
    generatedBy: request.auth.uid,
    generatedAt: new Date().toISOString()
  }
})

export const setUserRole = onCall(async (request) => {
  requireAdmin(request)

  const uid = String(request.data?.uid || '')
  const role = request.data?.role === 'admin' ? 'admin' : 'member'

  if (!uid) {
    throw new HttpsError('invalid-argument', 'A Firebase uid is required.')
  }

  await admin.auth().setCustomUserClaims(uid, { role })
  return { uid, role }
})
