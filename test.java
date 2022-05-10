import java.util.*;

class Paire {
    int i;
    int j;

    Paire(int _i, int _j) {
        i = _i;
        j = _j;
    }
}

class Solution {
    public int solve(int[][] matrix) {
        int n = matrix.length;
        if (n == 0) {
            return 0;
        }
        int m = matrix[0].length;
        boolean[][] vis = new boolean[n][m];
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (matrix[i][j] == 1 && vis[i][j] == false) {
                    count++;
                    vis[i][j] = true;
                    visitIsland(i, j, matrix, vis);
                }
            }
        }

        return count;
    }

    public void visitIsland(int i, int j, int[][] matrix, boolean[][] vis) {
        Queue<Paire> q = new LinkedList<>();
        int[] di = new int[] { 1, 0, 0, -1 };
        int[] dj = new int[] { 0, 1, -1, 0 };
        q.offer(new Paire(i, j));
        while (!q.isEmpty()) {
            Paire p = q.poll();
            int ti = p.i;
            int tj = p.j;

            for (int it = 0; it < 4; it++) {
                int ni = ti + di[it];
                int nj = tj + dj[it];

                if (ni > 0 && ni < matrix.length && nj > 0 && nj < matrix[0].length) {
                    if (matrix[ni][nj] != 0 && vis[ni][nj] == false) {
                        vis[ni][nj] = true;
                        q.offer(new Paire(ni, nj));
                    }
                }
            }
        }
    }
}