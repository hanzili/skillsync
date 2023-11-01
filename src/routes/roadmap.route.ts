import express from 'express'
import RoadmapController from '../controllers/roadmap.controller'
import { authenticateJWT } from '../middlewares/user.middleware'

const router = express.Router()

router.get('/', RoadmapController.getRoadmaps)
router.get('/:roadmapId', RoadmapController.getRoadmap)
router.post('/', authenticateJWT, RoadmapController.createRoadmap)
router.put('/:roadmapId', authenticateJWT, RoadmapController.updateRoadmap)
router.delete('/:roadmapId', authenticateJWT, RoadmapController.deleteRoadmap)
router.post('/:roadmapId/enroll', RoadmapController.enroll)
router.post('/:roadmapId/unenroll', RoadmapController.unenroll)

export default router
