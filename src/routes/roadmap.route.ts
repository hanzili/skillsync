import express from 'express'
import RoadmapController from '../controllers/roadmap.controller'
import { authenticateJWT, authorize } from '../middlewares/user.middleware'

const router = express.Router()

router.get('/', RoadmapController.getRoadmaps)
router.get('/:roadmapId', RoadmapController.getRoadmap)
router.post('/', authenticateJWT, authorize, RoadmapController.createRoadmap)
router.put(
  '/:roadmapId',
  authenticateJWT,
  authorize,
  RoadmapController.updateRoadmap,
)
router.delete(
  '/:roadmapId',
  authenticateJWT,
  authorize,
  RoadmapController.deleteRoadmap,
)
// router.post('/:roadmapId/enroll', RoadmapController.enroll)
// router.post('/:roadmapId/unenroll', RoadmapController.unenroll)
